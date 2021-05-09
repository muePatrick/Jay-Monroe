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
        :notes="notes"
        :selectedNote="selectedNote"
        @selectNote="selectNote($event)"
        @removeNote="removeNote"
        @forceSave="forceSave"
      />
    </aside>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";
import Chat from "@/components/Chat";

export default {
  components: {
    tvul: TreeviewUl,
    chat: Chat
  },
  props: ["user", "notes", "selectedNote"],
  data() {
    return {
      forceRefresh: false
    };
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {
    addNote() {
      this.notes[Date.now()] = {
        title: "New Note",
        content: "",
        subnotes: {}
      };
      this.$emit("forceSave");
      this.forceRefresh = !this.forceRefresh; //HACK
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
