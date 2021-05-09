<template>
  <div class="viewRoot">
    <ul
      class="menu-list chat-items"
      ref="messageList"
      style="overflow-y: auto; height: 100px"
    >
      <li v-for="(msg, msgId) in messages" :key="msgId">
        <span class="chat-timestamp">[{{ msg.date }}] </span>
        <span class="chat-sender">{{ msg.from }}: </span>
        {{ msg.message }}
      </li>
    </ul>
    <textarea
      rows="3"
      class="textarea has-fixed-size is-small"
      v-model="enteredMsg"
      placeholder="Enter Message (ctrl + enter to send)"
      ref="messageInput"
      v-on:keydown.ctrl.enter.prevent
      v-on:keyup.ctrl.enter="sendMsg"
    ></textarea>
    <button class="button chat-button" v-on:click="sendMsg">Send</button>
  </div>
</template>

<style scoped>
@import "../css/bulma.css";
</style>

<script>
import fakeMessages from "@/data/fakeMessages";

export default {
  components: {},
  props: [],
  data() {
    return {
      messages: fakeMessages,
      enteredMsg: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    return true;
  },
  methods: {
    // TODO is UUID generator safe against duplicates? Safer solutions possible.
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    sendMsg() {
      if (this.enteredMsg === "") {
        alert("Not sending empty message");
      } else {
        alert('Sending "' + this.enteredMsg + '"');
        this.messages[this.uuidv4()] = {
          from: "Me",
          date: new Date().toLocaleString(),
          message: this.enteredMsg,
        };
      }
      this.enteredMsg = "";
      this.$refs.messageInput.focus();
      return true;
    },
  },
  mounted() {
    // scroll to bottom of chat messages
    this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
  },
  updated() {
    // scroll to bottom of chat messages
    this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
  },
};
</script>

<style scoped>
.viewRoot {
  margin: 0;
  border: 0;
  padding: 0;
}

.chat-button {
  width: 100%;
}

.chat-items {
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
}

.chat-timestamp {
  font-weight: 900;
  color: blue;
}

.chat-sender {
  font-weight: 900;
}
</style>
