<template>
  <div class="viewRoot">
    <div class="columns">
      <div class="column is-2">
        <aside class="menu eighty-scrollable">
          <p class="menu-label">Users</p>
          <ul class="menu-list">
            <li v-for="(user, userId) in user" :key="userId">
              <a
                ><span
                  class="icon is-small"
                  :class="{ 'has-text-success': user.online }"
                >
                  <font-awesome-icon :icon="['fas', 'user']" /> </span
                >{{ user.name }}</a
              >
            </li>
          </ul>
          <p class="menu-label">Notes</p>
          <ul class="menu-list">
            <li
              v-for="(note, noteId) in notes"
              :key="noteId"
              v-on:click="selectNote(noteId)"
            >
              <a :class="{ 'is-active': noteId == selectedNote }">{{
                note.title
              }}</a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <editor ref="toastuiEditor" class="space-out" height="100%"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";

import fakeData from "@/data/fakeData";
import fakeUser from "@/data/fakeUser";

export default {
  components: {
    editor: Editor,
  },
  props: ["placeholderProp"],
  data() {
    return {
      notes: fakeData,
      user: fakeUser,
      selectedNote: "",
    };
  },
  computed: {},
  watch: {},
  created: function () {
    return true;
  },
  methods: {
    selectNote: function (uuid) {
      this.selectedNote = uuid;
      this.$refs.toastuiEditor.invoke('setMarkdown', this.notes[uuid].content, 'false');
      return true;
    },
  },
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
