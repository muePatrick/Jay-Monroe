<template>
  <div class="viewRoot">
    <ul class="notesList" :key="forceRefresh">
      <li v-for="(note, noteId) in notes" :key="noteId">
        <a
          :class="{ 'is-active': noteId == selectedNote }"
          v-on:click="selectNote([noteId])"
          >{{ note.title }}</a
        >
        <font-awesome-icon
          v-if="note.subnotes"
          class="smaller-icon"
          :icon="['fas', note.collapsed ? 'plus-square' : 'minus-square']"
          @click="toggleNoteCollapse(noteId)"
          style="cursor: pointer;"
        />
        <tvul
          v-if="note.subnotes && !note.collapsed"
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
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
    toggleNoteCollapse(uuid) {
      this.notes[uuid]["collapsed"] =
        this.notes[uuid]["collapsed"] == true ? false : true;
      this.forceRefresh = !this.forceRefresh; // HACK
    }
  }
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
  margin-bottom: 10px;
}

.smaller-icon {
  transform: scale(0.75);
}

.notesList a {
  color: #9B9A97;
  margin-right: 5px;
  user-select: none;
}

.notesList {
  color: #9B9A97;
}

.notesList a:hover {
  color: rgba(155,154,151,0.4);
}

.is-active {
  font-weight: bold;
}

.notesList a::before {
  content: "•";
  color: red;
  animation: huerotate 5s linear infinite;
  margin-right: 5px;
  margin-left: 5px;
}

@keyframes huerotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.notesList ul {
  margin-left: 20px;
}

.notesList ul a::before {
}
</style>
