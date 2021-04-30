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
      <p class="menu-label">Notes</p>
      <!-- TODO move ul to own component to enable recursion -->
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
</template>

<style scoped>
@import "../css/bulma.css";
</style>

<script>
export default {
  components: {},
  props: ["user", "notes", "selectedNote"],
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
      console.log("emitting")
      this.$emit('selectNote', uuid)
      return true;
    },
  },
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
