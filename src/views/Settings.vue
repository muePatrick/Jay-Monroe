<template>
  <div class="viewRoot">
    Hello World
  </div>
</template>

<script>
import database from "@/data/pouchdb";

export default {
  components: {},
  data() {
    return {
      foo: "bar"
    };
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {}
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>

<style lang="css" scoped>
div {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
