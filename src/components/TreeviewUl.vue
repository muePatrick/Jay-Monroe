<template>
  <div class="viewRoot">
    <ul class="notesList">
      <li v-for="(note, noteId) in notes" :key="noteId">
        <a
          :class="{ 'is-active': noteId == selectedNote }"
          v-on:click="selectNote([noteId])"
          >{{ note.title }}</a
        >
        <font-awesome-icon
          :icon="['fas', noteId.collapsed?'plus-square':'minus-square']"
          :click="toggleNoteCollapse(noteId)"
          style="cursor: pointer;"
        />
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
    },
    toggleNoteCollapse(uuid) {
      this.notes[uuid]["collapsed"] =
        this.notes[uuid]["collapsed"] == true ? false : true;
      console.log(this.notes[uuid]);
    }
  }
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  margin-bottom: 10px;
  border: 0;
  padding: 0;
}

.notesList a {
  color: #555555;
  margin-right: 5px;
}

.notesList a::before {
  content: "•";
  color: red;
  margin-right: 5px;
  margin-left: 5px;
}

.notesList ul {
  margin-left: 20px;
}

.notesList ul a::before {
}
</style>
