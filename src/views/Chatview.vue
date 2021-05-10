<template>
  <div class="viewRoot">
    <chat />
  </div>
</template>

<script>
import Chat from "@/components/Chat";

export default {
  components: {
    chat: Chat
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
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
