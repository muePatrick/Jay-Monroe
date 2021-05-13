<template>
  <!-- <div class="viewRoot"> -->
  <!-- <ul class="notesList" :key="forceRefresh"> -->
  <li :key="forceRefresh">
    <div class="dropdown is-hoverable color-rotate">
      <div class="dropdown-trigger">
        <font-awesome-icon
          class="menudot"
          :icon="['fas', 'ellipsis-h']"
          style="cursor: pointer"
        />
      </div>
      <div class="dropdown-menu" id="dropdown-menu3" role="menu">
        <div class="dropdown-content">
          <a href="#" class="dropdown-item" @click="addSubnote()">
            Add Subnote
          </a>
          <a href="#" class="dropdown-item" @click="removeNote()">
            Remove
          </a>
          <hr class="dropdown-divider" />
          <a href="#" class="dropdown-item"> More... </a>
        </div>
      </div>
    </div>

    <a
      :class="{ 'is-active': note._id == selectedNote }"
      v-on:click="selectNote(note._id)"
      >{{ note.title }}</a
    >
    <font-awesome-icon
      v-if="note.subnotes"
      class="smaller-icon"
      :icon="['fas', note.collapsed ? 'plus-square' : 'minus-square']"
      @click="toggleNoteCollapse()"
      style="cursor: pointer"
    />

    <ul class="notesList" v-if="!note.collapsed">
      <tvul
        v-for="note in note.subnotes"
        :key="note"
        :selectedNote="selectedNote"
        :noteId="note"
        @selectNote="selectNote"
        @doForceRefresh="doForceRefresh"
      />
    </ul>
  </li>
  <!-- </ul>
  </div> -->
</template>

<script>
import database from "@/data/pouchdb";

export default {
  components: {
    tvul: () => import("@/components/TreeviewUl") // Recursions can not be loaded normally
  },
  props: ["noteId", "selectedNote"],
  data() {
    return {
      note: {},
      forceRefresh: false
    };
  },
  computed: {},
  watch: {},
  created() {
    database.getNoteById(this.noteId).then(note => {
      this.note = note;
    });
    return true;
  },
  methods: {
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
    toggleNoteCollapse() {
      this.note["collapsed"] = this.note["collapsed"] == true ? false : true;
      database.setNote(this.note);
      this.forceRefresh = !this.forceRefresh; // HACK
    },
    addSubnote() {
      // BUG adding two notes quickly and removing one instantly, removes the second one too
      // both got "newId"s but when removing one the other did not appear in the subnote array
      database.addNoteUnder(this.note._id).then(newId => {
        this.note.subnotes.push(newId.id);
        database.setNote(this.note).then(() => {
          this.forceRefresh = !this.forceRefresh; // HACK
        });
      });
    },
    removeNote() {
      database
        .removeNotesAndSubnotes(this.note)
        .then(() => {
          this.$emit("doForceRefresh");
          // BUG Ghost Note is still visible in editor
        })
        .catch(err => {
          console.debug(
            `Error while deleting note parent. This is because the note is a root note: ${err}`
          );
        });
    },
    doForceRefresh() {
      this.forceRefresh = !this.forceRefresh;
      this.$emit("doForceRefresh");
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

.is-active {
  font-weight: bold;
}

.notesList2 a::before {
  content: "•";
  color: red;
  animation: huerotate 5s linear infinite;
  margin-right: 5px;
  margin-left: 5px;
}

.menudot {
  color: red;
  animation: huerotate 5s linear infinite;
  margin-right: 5px;
  margin-left: 5px;
  transform: scale(0.7);
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
</style>
