<template>
  <div class="viewRoot">
    <ul class="notesList" :key="forceRefresh">
      <li v-for="note in notes" :key="note._id">
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
              <a href="#" class="dropdown-item" @click="addSubnote(note)">
                Add Subnote
              </a>
              <a href="#" class="dropdown-item" @click="removeNote(note._id)">
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
          @click="toggleNoteCollapse(note._id)"
          style="cursor: pointer"
        />

        <tvul
          v-if="!note.collapsed"
          :notes="subnotes"
          :selectedNote="selectedNote"
          @selectNote="selectNote"
          @removeNote="removeNote2(note.subnotes, $event)"
          @forceSave="forceSave"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "../css/bulma.css";
</style>

<script>
import database from "@/data/pouchdb";

export default {
  components: {
    tvul: () => import("@/components/TreeviewUl") // Recursions can not be loaded normally
  },
  props: ["notes", "selectedNote"],
  data() {
    return {
      subnotes: [],
      forceRefresh: false
    };
  },
  computed: {},
  watch: {},
  created() {
    database.getNoteArrayByIds(this.notes).then(s => {
      this.subnotes = s.rows.map(c => c.doc);
    });
    return true;
  },
  methods: {
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
    toggleNoteCollapse(uuid) {
      // this.notes[uuid]["collapsed"] =
      //   this.notes[uuid]["collapsed"] == true ? false : true;
      this.forceRefresh = !this.forceRefresh; // HACK
    },
    addSubnote(note) {
      // if (note.subnotes == undefined) {
      //   note.subnotes = {};
      // }
      // note.subnotes[Date.now()] = {
      //   title: "New Note",
      //   content: "",
      //   subnotes: {}
      // };
      this.forceRefresh = !this.forceRefresh; // HACK
      this.$emit("forceSave");
    },
    removeNote(uuid) {
      this.$emit("removeNote", uuid);
    },
    removeNote2(notes, uuid) {
      // delete notes[uuid];
      this.$emit("forceSave");
      this.forceRefresh = !this.forceRefresh; // HACK
    },
    forceSave() {
      this.$emit("forceSave");
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
