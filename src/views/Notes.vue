<template>
  <div class="viewRoot">
    <div class="columns">
      <div class="column is-2">
        <aside class="menu">
          <p class="menu-label">
            Users
          </p>
          <ul class="menu-list">
            <li>
              <a
                ><span class="icon is-medium has-text-success">
                  <font-awesome-icon :icon="['fas', 'user']" /> </span
                >Patrick</a
              >
            </li>
            <li>
              <a
                ><span class="icon is-medium has-text-dark">
                  <font-awesome-icon :icon="['fas', 'user']" /> </span
                >Tobias</a
              >
            </li>
          </ul>
          <p class="menu-label">
            Notes
          </p>
          <ul class="menu-list">
            <li v-for="(value, key) in notes" :key="key">
              <a :class="{ 'is-active': key == 0 }">{{ value }}</a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div style="background-color: red; height: 100%">...</div>
      </div>
      <div class="column">
        <div style="background-color: green; height: 100%">...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["placeholderProp"],
  data() {
    return {
      placeholderData: undefined,
      notes: [
        "dolor",
        "omnis",
        "harum",
        "dolore",
        "maiores",
        "officia",
        "soluta",
        "id",
        "culpa",
        "culpa",
        "laudantium",
        "suscipit",
        "et",
        "ab",
        "placeat",
        "iusto",
        "earum",
        "vitae",
        "corporis",
        "fugit",
        "nobis",
        "accusantium",
        "et",
        "amet",
        "dolores"
      ]
    };
  },
  computed: {},
  created: function() {
    return true;
  },
  methods: {
    placeholderFunction: function() {
      return true;
    }
  }
};
</script>

<style scoped>
@import "../css/bulma.css";
</style>

<style lang="css" scoped></style>
