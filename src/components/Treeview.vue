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
      <tvul
        :key="forceRefresh"
        :notes="notes"
        :selectedNote="selectedNote"
        @selectNote="selectNote($event)"
        @removeNote="removeNote"
      />
    </aside>
  </div>
</template>

<script>
import TreeviewUl from "@/components/TreeviewUl";

export default {
  components: {
    tvul: TreeviewUl
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
    selectNote(uuid) {
      this.$emit("selectNote", uuid);
      return true;
    },
    removeNote(uuid) {
      delete this.notes[uuid];
      this.forceRefresh = !this.forceRefresh; //HACK
      this.$emit("selectNote", undefined);
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
