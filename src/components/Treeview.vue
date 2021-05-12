<template>
  <div class="viewRoot">
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
      <p class="menu-label">Chat</p>
      <chat />
      <p class="menu-label">
        Notes
        <font-awesome-icon :icon="['fas', 'plus-square']" @click="addNote" />
      </p>
      <tvul
        class="scrollable"
        :key="forceRefresh"
        :selectedNote="selectedNote"
        :notes="rootNotes"
        @selectNote="selectNote"
        @removeNote="removeNote"
        @forceSave="forceSave"
      />
      <button class="button" @click="testDB">TestDB</button>
    </aside>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";
import Chat from "@/components/Chat";

import database from "@/data/pouchdb";

export default {
  components: {
    tvul: TreeviewUl,
    chat: Chat
  },
  props: ["user", "selectedNote"],
  data() {
    return {
      rootNotes: [],
      forceRefresh: false
    };
  },
  computed: {},
  watch: {},
  created() {
    database.getNotesByParent(null).then(r => {
      this.rootNotes = r.docs;
    });
    return true;
  },
  methods: {
    addNote() {
      // this.notes[Date.now()] = {
      //   title: "New Note",
      //   content: "",
      //   subnotes: {}
      // };
      // this.$emit("forceSave");
      // this.forceRefresh = !this.forceRefresh; //HACK
    },
    async testDB() {
      database.getRootIds()
      console.log("Button pressed. It does nothing!");
    },
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
    removeNote(uuid) {
      delete this.notes[uuid];
      this.forceRefresh = !this.forceRefresh; //HACK
      this.$emit("selectNote", undefined);
      this.$emit("forceSave");
    },
    forceSave() {
      this.$emit("forceSave");
    }
  }
};
</script>

<style scoped>
@import "../css/bulma.css";
</style>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
  background-color: #ebeced;
}
</style>
