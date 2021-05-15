<template>
  <li :key="forceRefresh">
    <div
      class="dropdown is-hoverable color-rotate"
      :class="{ 'is-active': menuOpen }"
    >
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
      draggable="true"
      @dragstart="doDragStart"
      @dragend="doDragEnd"
      @dragenter="doDragEnter"
      ondragover="event.preventDefault()"
      @dragleave="doDragLeave"
      @drop="doDrop"
      @contextmenu="openMenu"
      @blur="closeMenu"
      >{{ note.title }}</a
    >
    <font-awesome-icon
      v-if="hasSubnotes"
      class="smaller-icon"
      :icon="['fas', note.collapsed ? 'caret-up' : 'caret-down']"
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
      menuOpen: false,
      forceRefresh: false
    };
  },
  computed: {
    hasSubnotes() {
      return this.note.subnotes?.length > 0;
    }
  },
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
          this.$emit("doForceRefresh"); // HACK
          // BUG Ghost Note is still visible in editor
        })
        .catch(err => {
          this.$emit("reloadRootNotes");
          console.debug(
            `Error while deleting note parent. This is because the note is a root note: ${err}`
          );
        });
    },
    doForceRefresh() {
      this.forceRefresh = !this.forceRefresh;
      this.$emit("doForceRefresh");
    },
    doDragStart(event) {
      event.dataTransfer.setData("application/json", JSON.stringify(this.note));
      event.dataTransfer.effectAllowed = "move";
      event.currentTarget.style.border = "dotted";
    },
    doDragEnd(event) {
      event.dataTransfer.clearData();
      event.dataTransfer.effectAllowed = "none";
      event.currentTarget.style.border = "none";
    },
    doDragEnter(event) {
      event.preventDefault();
      event.srcElement.style.borderTop = "dashed";
    },
    doDragLeave(event) {
      event.preventDefault();
      event.srcElement.style.borderTop = "none";
    },
    doDrop(event) {
      event.preventDefault();
      event.srcElement.style.borderTop = "none";
      const data = JSON.parse(event.dataTransfer.getData("application/json"));
      database.moveNote(data._id, this.noteId).then(() => {
        console.log("Note Moved");
        this.forceRefresh = !this.forceRefresh;
        this.$emit("doForceRefresh");
      });
    },
    openMenu(event) {
      event.preventDefault();
      // BUG Adding new notes if menu is open via click and not hover, does not work
      this.menuOpen = true;
    },
    closeMenu(event) {
      event.preventDefault();
      this.menuOpen = false;
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
