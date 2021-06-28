<template>
  <div class="viewRoot" ref="viewRoot">
    <div class="menuHeader">
      <p class="menu-label is-unselectable">
        Notes
        <font-awesome-icon
          :icon="['fas', 'plus']"
          @click="addRootNote"
          style="cursor: pointer;"
        />
      </p>
      <button class="delete menuClose" @click="closeMenu"></button>
    </div>
    <aside class="menu eighty-scrollable">
      <!-- <p class="menu-label is-unselectable" v-if="settingsShowUser">Users</p>
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
      <p class="menu-label is-unselectable" v-if="settingsShowChat">Chat</p>
      <chat v-if="settingsShowChat" /> -->
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
    <div class="menuFooter">
      Lorem ipsum dolor sit amet.
    </div>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";
// import Chat from "@/components/Chat";

import database from "@/data/pouchdb";
import store from "@/store/index.ts";

export default {
  components: {
    tvul: TreeviewUl
    // chat: Chat
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
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    handleKeyDown(event) {
      console.log(event);
    }
  }
};
</script>

<style scoped>
.viewRoot {
  --menu-height: max(70vh, 300px);
  --menu-width: max(20vw, 300px);

  border: 0;
  padding: 0;

  margin-left: calc(var(--menu-width) / -2);
  margin-right: 0;
  margin-top: calc(var(--menu-height) / -2);
  margin-bottom: 0;

  width: var(--menu-width);
  height: var(--menu-height);

  position: fixed;
  z-index: 10;
  top: calc(100vh / 2);
  left: calc(100vw / 2);

  background-color: #ffffff;

  border: solid;
  border-width: 2px;
  border-color: #c5c5c5;
  border-radius: 5px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
}

.menuHeader {
  width: 100%;
  height: 2em;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: solid;
  border-width: 1px;
  border-color: #c5c5c5;

  padding: 2px;
  background-color: #f7f7f7;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.menuFooter {
  width: 100%;
  height: 2em;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: solid;
  border-width: 1px;
  border-color: #c5c5c5;

  background-color: #f7f7f7;

  text-align: center;
}

.notesList a {
  color: #9b9a97;
  margin-right: 5px;
  user-select: none;
}

.notesList {
  color: #9b9a97;
}

.notesList a:hover {
  color: rgba(155, 154, 151, 0.4);
}

.menu {
  padding: 10px;
  height: 100%;
}
</style>
