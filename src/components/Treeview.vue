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
      <chat :messages="messages" />
      <p class="menu-label">Notes</p>
      <tvul
        :notes="notes"
        :selectedNote="selectedNote"
        @selectNote="selectNote($event)"
      />
    </aside>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";
import Chatview from "@/components/Chatview";

export default {
  components: {
    tvul: TreeviewUl,
    chat: Chatview,
  },
  props: ["user", "notes", "selectedNote", "messages"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
  },
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
}
</style>
