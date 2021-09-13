<template>
  <div
    :class="{ viewRootFloating: floating, viewRootFixed: !floating }"
    ref="viewRoot"
  >
    <div class="menuHeader">
      <p class="menu-label is-unselectable">
        Notes
        <font-awesome-icon
          :icon="['fas', 'plus']"
          @click="addRootNote"
          style="cursor: pointer;"
        />
      </p>
      <button
        v-if="floating"
        class="delete menuClose"
        @click="closeMenu"
      ></button>
    </div>
    <aside class="menu eighty-scrollable">
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
      Lorem
      <span
        class="icon is-small has-text-dark"
        :class="{ toggleDockedIcon: floating, toggleDockedIconAlt: !floating }"
        @click="toggleDocked"
      >
        <font-awesome-icon :icon="['fas', 'thumbtack']" />
      </span>
    </div>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";

import database from "@/data/pouchdb";

export default {
  components: {
    tvul: TreeviewUl
    // chat: Chat
  },
  props: ["selectedNote", "floating"],
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
      database.addRootNote().then(newId => {
        this.rootNotes.push(newId.id);
        this.forceRefresh = !this.forceRefresh; //HACK
        this.$emit("doForceRefresh");
      });
    },
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
    },
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
    toggleDocked() {
      this.$emit("toggleDocked");
    },
    handleKeyDown(event) {
      console.log(event);
    }
  }
};
</script>

<style scoped>
.viewRootFloating {
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

.viewRootFixed {
  /* Somehow set this in the parent element */
  --menu-height: calc(100vh - 52px);
  --menu-width: max(20vw, 300px);

  border: 0;
  padding: 0;

  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;

  width: var(--menu-width);
  height: var(--menu-height);

  /* position: fixed;
  z-index: 10;
  top: calc(100vh / 2);
  left: calc(100vw / 2); */

  background-color: #ffffff;

  border: none;
  /* border-width: 2px;
  border-color: #c5c5c5;
  border-radius: 5px; */

  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */

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

  padding: 10px;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: solid;
  border-width: 1px;
  border-color: #c5c5c5;

  background-color: #f7f7f7;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

.toggleDockedIcon {
  cursor: pointer;
  transform: rotate(45deg);
}

.toggleDockedIcon:hover {
  cursor: pointer;
  transform: rotate(0deg);
}

.toggleDockedIconAlt {
  cursor: pointer;
  transform: rotate(0deg);
}

.toggleDockedIconAlt:hover {
  cursor: pointer;
  transform: rotate(45deg);
}
</style>
