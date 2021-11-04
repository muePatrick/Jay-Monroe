<template>
  <div :class="{ viewRoot: notesMenuDocked }">
    <XyzTransition xyz="down-100% narrow duration-2">
      <div
        class="has-background-primary openNotesMenuButton"
        v-if="!showNotesMenu && !notesMenuDocked"
        @click="showNotesMenu = true"
      >
        <span class="icon is-large has-text-light">
          <font-awesome-icon :icon="['fas', 'sticky-note']" />
        </span>
      </div>
    </XyzTransition>
    <XyzTransition
      xyz="fade small-100% up-50% duration-2 origin-top"
      :css="!notesMenuDocked"
    >
      <notesmenu
        :key="forceRefresh"
        :selectedNote="selectedNote"
        :floating="!notesMenuDocked"
        class="eighty-scrollable"
        @selectNote="selectNote"
        v-if="showNotesMenu || notesMenuDocked"
        @closeMenu="showNotesMenu = false"
        @toggleDocked="handleNotesMenuDockedToggle"
      />
    </XyzTransition>
    <div class="notesPane" :class="{ lock: !selectedNote }">
      <input
        class="input is-medium title-input"
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
          :initialEditType="settingsWysiwyg"
          @change="onEditorChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import NotesMenu from "@/components/NotesMenu";

import database from "@/data/pouchdb";
import store from "@/store/index.ts";

export default {
  components: {
    editor: Editor,
    notesmenu: NotesMenu
  },
  data() {
    return {
      selectedNote: "",
      currentNote: { title: "" },
      editorOptions: {
        usageStatistics: false
      },
      noChangeTimeout: undefined,
      forceRefresh: false,
      loadingDone: false,
      showNotesMenu: false
    };
  },
  computed: {
    notesMenuDocked() {
      return store.state.settingsNotesMenuDocked;
    },
    settingsWysiwyg() {
      return store.state.settingsWysiwyg;
    }
  },
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
    },
    handleNotesMenuDockedToggle() {
      store.commit("settingsNotesMenuDocked", !this.notesMenuDocked);
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

.viewRoot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.openNotesMenuButton {
  --spacing: 25px;
  --sizeing: 3rem;

  border: 0;
  padding: 0;
  margin: 0;

  width: var(--sizeing);
  height: var(--sizeing);

  position: fixed;
  z-index: 10;
  /* top: calc(calc(100vh - 52px) - var(--spacing)); */
  bottom: var(--spacing);
  left: var(--spacing);

  border-radius: 1000px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  cursor: pointer;
}

.notesPane {
  /* border: solid;
  border-color: greenyellow; */
  height: calc(100vh - 52px);
  width: 100%;
}

.eighty-scrollable {
  /* height: calc(100vh - 52px);
  overflow-y: scroll; */
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

.title-input {
  border-radius: 0;
}

.title-input:focus {
  border-color: rgb(219, 219, 219);
  -webkit-box-shadow: 0px 0px 0px 0px #ddd;
  -moz-box-shadow: 0px 0px 0px 0px #ddd;
  box-shadow: 0px 0px 0px 0px #ddd;
}

.title-input:hover {
  border-color: rgb(219, 219, 219);
  -webkit-box-shadow: 0px 0px 0px 0px #ddd;
  -moz-box-shadow: 0px 0px 0px 0px #ddd;
  box-shadow: 0px 0px 0px 0px #ddd;
}
</style>
