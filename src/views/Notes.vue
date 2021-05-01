<template>
  <div class="viewRoot">
    <div class="columns">
      <div class="column is-2">
        <tv
          :user="user"
          :notes="notes"
          :selectedNote="selectedNote"
          class="eighty-scrollable"
          @selectNote="selectNote"
        />
      </div>
      <div class="column">
        <editor ref="toastuiEditor" class="space-out" height="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import Treeview from "@/components/Treeview";

import fakeData from "@/data/fakeData";
import fakeUser from "@/data/fakeUser";

export default {
  components: {
    editor: Editor,
    tv: Treeview
  },
  data() {
    return {
      notes: fakeData,
      user: fakeUser,
      selectedNote: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {
    selectNote(uuid) {
      let note;
      uuid.forEach(currentUuid => {
        if (!note) {
          note = this.notes[currentUuid];
        } else {
          note = note["subnotes"][currentUuid];
        }
      });
      this.$refs.toastuiEditor.invoke("setMarkdown", note.content, "false");
      this.selectedNote = uuid.pop();
      return true;
    }
  }
};
</script>

<style scoped>
@import "../css/bulma.css";
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
</style>
