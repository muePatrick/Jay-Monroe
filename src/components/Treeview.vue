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
        <font-awesome-icon
          :icon="['fas', 'plus-square']"
          @click="addRootNote"
          style="cursor: pointer;"
        />
      </p>
      <ul class="notesList" :key="forceRefresh">
        <tvul
          v-for="rootNote in rootNotes"
          :key="rootNote"
          :selectedNote="selectedNote"
          :noteId="rootNote"
          @selectNote="selectNote"
          @doForceRefresh="doForceRefresh"
        />
      </ul>
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
    database.getRootIds().then(r => {
      this.rootNotes = r.docs.map(v => v._id);
    });
    return true;
  },
  methods: {
    addRootNote() {
      database.addRootNote().then(() => {
        this.forceRefresh = !this.forceRefresh; //HACK
        this.$emit("doForceRefresh");
      });
    },
    async testDB() {
      database.addTest();
      console.log("Button pressed. It does nothing!");
    },
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
    },
    removeNote(uuid) {
      delete this.notes[uuid];
      this.forceRefresh = !this.forceRefresh; //HACK
      this.$emit("selectNote", undefined);
      this.$emit("forceSave");
    },
    forceSave() {
      this.$emit("forceSave");
    },
    doForceRefresh() {
      this.forceRefresh = !this.forceRefresh;
      this.$emit("doForceRefresh");
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
