<template>
  <div class="viewRoot">
    <div class="columns">
      <div class="column is-2">
        <tv
          :key="forceRefresh"
          :user="user"
          :selectedNote="selectedNote"
          class="eighty-scrollable"
          @selectNote="selectNote"
        />
      </div>
      <div class="column" :class="{ lock: !selectedNote }">
        <input
          class="input is-medium"
          type="text"
          placeholder="Title"
          ref="noteTitleInput"
          v-model="currentNote.title"
          @change="onNoteTitleChange"
        />
        <div class="editor">
          <editor
            ref="toastuiEditor"
            class="space-out"
            height="100%"
            :options="editorOptions"
            @change="onEditorChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import Treeview from "@/components/Treeview";

import fakeUser from "@/data/fakeUser";

import database from "@/data/pouchdb";

export default {
  components: {
    editor: Editor,
    tv: Treeview
  },
  data() {
    return {
      user: fakeUser,
      selectedNote: "",
      currentNote: { title: "" },
      editorOptions: {
        usageStatistics: false
      },
      noChangeTimeout: undefined,
      forceRefresh: false,
      loadingDone: false
    };
  },
  computed: {},
  watch: {
    currentNote: {
      deep: true,
      handler() {
        // TODO move this to input field change and select new note and somehow stop the complete redraw
        if (this.noChangeTimeout) {
          clearTimeout(this.noChangeTimeout);
          this.noChangeTimeout = undefined;
        }
        this.noChangeTimeout = setTimeout(() => {
          // BUG if no note is opened this results in a pouchDB Error because it is not a valid not (no id)
          database
            .setNote({
              _id: this.currentNote._id,
              title: this.currentNote.title,
              content: this.currentNote.content
            })
            .then(() => {
              console.log("Autosaved");
              // TODO get li by ref=noteId and only refresh that item to save resources
              this.noChangeTimeout = undefined;
              this.forceRefresh = !this.forceRefresh; // HACK
            });
        }, 1000);
      }
    }
  },
  created() {
    return true;
  },
  methods: {
    selectNote(uuid) {
      if (this.noChangeTimeout) {
        clearTimeout(this.noChangeTimeout);
        this.noChangeTimeout = undefined;
      }
      if (this.selectedNote == "") {
        database.getNoteById(uuid).then(note => {
          this.currentNote = note;
          this.selectedNote = uuid;
          this.$refs.toastuiEditor.invoke(
            "setMarkdown",
            this.currentNote.content,
            "false"
          );
        });
      } else {
        database
          .setNote({
            _id: this.currentNote._id,
            title: this.currentNote.title,
            content: this.currentNote.content
          })
          .then(() => {
            if (uuid == undefined) {
              this.selectedNote = "";
              this.currentNote = { title: "" };
              this.$refs.toastuiEditor.invoke("setMarkdown", "", "false");
              return true;
            }
            database.getNoteById(uuid).then(note => {
              this.currentNote = note;
              this.selectedNote = uuid;
              this.$refs.toastuiEditor.invoke(
                "setMarkdown",
                this.currentNote.content,
                "false"
              );
            });
          });
      }
      return true;
    },
    onEditorChange() {
      this.currentNote.content = this.$refs.toastuiEditor.invoke("getMarkdown");
      if (this.noChangeTimeout) {
        clearTimeout(this.noChangeTimeout);
        this.noChangeTimeout = undefined;
      }
      this.noChangeTimeout = setTimeout(() => {
        database
          .setNote({
            _id: this.currentNote._id,
            title: this.currentNote.title,
            content: this.currentNote.content
          })
          .then(() => {
            console.log("Autosaved");
            // TODO get li by ref=noteId and only refresh that item to save resources
            this.noChangeTimeout = undefined;
            this.forceRefresh = !this.forceRefresh; // HACK
          });
      }, 1000);
    },
    onNoteTitleChange() {
      console.log(this.$refs.noteTitleInput);
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/codemirror/lib/codemirror.css";
@import "../../node_modules/@toast-ui/editor/dist/toastui-editor.css";
</style>

<style lang="css" scoped>
div {
  margin: 0;
  padding: 0;
  border: 0;
}

.eighty-scrollable {
  height: calc(100vh - 52px);
  overflow-y: scroll;
}

.space-out {
  margin: 0px;
  height: 100vh;
}

.lock {
  pointer-events: none;
  filter: blur(1.5px) grayscale();
  user-select: none;
}

.editor {
  height: calc(100% - 50px);
  overflow-y: hidden;
}
</style>
