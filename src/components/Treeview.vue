<template>
  <div class="viewRoot">
    <aside class="menu eighty-scrollable">
      <p class="menu-label" v-if="settingsShowUser">Users</p>
      <ul class="menu-list" v-if="settingsShowUser">
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
      <p class="menu-label" v-if="settingsShowChat">Chat</p>
      <chat v-if="settingsShowChat" />
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
          @reloadRootNotes="reloadRootNotes"
        />
      </ul>
    </aside>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";
import Chat from "@/components/Chat";

import database from "@/data/pouchdb";
import store from "@/store/index.ts";

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
  computed: {
    settingsShowUser() {
      return store.state.settingsShowUser;
    },
    settingsShowChat() {
      return store.state.settingsShowChat;
    }
  },
  watch: {},
  created() {
    database.getRootIds().then(r => {
      this.rootNotes = r.docs.map(v => v._id);
    });
    return true;
  },
  methods: {
    addRootNote() {
      database.addRootNote().then(newId => {
        this.rootNotes.push(newId.id);
        this.forceRefresh = !this.forceRefresh; //HACK
        this.$emit("doForceRefresh");
      });
    },
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
    },
    // removeNote(uuid) {
    //   delete this.notes[uuid];
    //   this.forceRefresh = !this.forceRefresh; //HACK
    //   this.$emit("selectNote", undefined);
    //   this.$emit("forceSave");
    // },
    // forceSave() {
    //   this.$emit("forceSave");
    // },
    doForceRefresh() {
      this.forceRefresh = !this.forceRefresh;
      this.$emit("doForceRefresh");
    },
    reloadRootNotes() {
      database.getRootIds().then(r => {
        this.rootNotes = r.docs.map(v => v._id);
        this.forceRefresh = !this.forceRefresh;
        this.$emit("doForceRefresh");
      });
    }
  }
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
