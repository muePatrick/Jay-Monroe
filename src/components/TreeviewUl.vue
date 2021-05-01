<template>
  <div class="viewRoot">
    <ul class="menu-list">
      <li v-for="(note, noteId) in notes" :key="noteId">
        <a
          :class="{ 'is-active': noteId == selectedNote }"
          v-on:click="selectNote([noteId])"
          >{{ note.title }}</a
        >
        <tvul
          v-if="note.subnotes"
          :notes="note.subnotes"
          :selectedNote="selectedNote"
          @selectNote="selectNote([noteId, ...$event])"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "../css/bulma.css";
</style>

<script>
export default {
  components: {
    tvul: () => import("@/components/TreeviewUl") // Recursions can not be loaded normally
  },
  props: ["notes", "selectedNote"],
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
