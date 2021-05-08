<template>
  <div class="viewRoot">
    <ul class="menu-list">
      <li v-for="(msg, msgId) in messages" :key="msgId">
        [{{ msg.date }}] {{ msg.from }}: {{ msg.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "../css/bulma.css";
</style>

<script>
import fakeMessages from "@/data/fakeMessages";

export default {
  components: {},
  data() {
    return {
      messages: fakeMessages,
    };
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {},
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
