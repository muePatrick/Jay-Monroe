<template>
  <div class="viewRoot">
    <div class="columns">
      <div class="column is-2">
        <aside class="menu">
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
          <ul class="menu-list">
            <li
              v-for="(note, noteId) in notes"
              :key="noteId"
              v-on:click="selectNote(noteId)"
            >
              <a :class="{ 'is-active': noteId == selectedNote }">{{
                note.title
              }}</a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <textarea
          v-if="selectedNote != ''"
          style="width: 100%; height: 100%; margin-top: 10px"
          v-model="notes[selectedNote].content"
        ></textarea>
      </div>
      <div class="column">
        <div v-html="renderedContent"
          v-if="selectedNote != ''"
          style="width: 100%; height: 100%; margin-top: 10px"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fakeData from "@/data/fakeData";
import fakeUser from "@/data/fakeUser";

import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItMermaid from "@liradb2000/markdown-it-mermaid";
import markdownItEmoji from "markdown-it-emoji";
import markdownItMark from "markdown-it-mark";
import markdownItKatex from "@iktakahiro/markdown-it-katex";
import markdownItTaskLists from "markdown-it-task-lists";
import markdownItFootnote from "markdown-it-footnote";
import markdownItHighlightjs from "markdown-it-highlightjs";

export default {
  components: {},
  props: ["placeholderProp"],
  data() {
    return {
      notes: fakeData,
      user: fakeUser,
      selectedNote: "",
      rawContent: "",
      renderedContent: "",
      md: undefined  //HACK find better place for this binding
    };
  },
  computed: {},
  watch: {},
  created: function() {
    this.md = new MarkdownIt({
      html: false,
      xhtmlOut: true,
      typographer: true
    })
      .use(markdownItEmoji)
      .use(markdownItMark)
      .use(markdownItAnchor)
      .use(markdownItTocDoneRight)
      .use(markdownItKatex)
      .use(markdownItTaskLists, { enabled: false })
      .use(markdownItFootnote)
      .use(markdownItMermaid, {
        startOnLoad: false,
        securityLevel: true,
        theme: "default"
      })
      .use(markdownItHighlightjs, { inline: true });
    return true;
  },
  methods: {
    selectNote: function(uuid) {
      this.selectedNote = uuid;
      this.renderedContent = this.md.render(
        this.notes[this.selectedNote].content
      );
      return true;
    },
    rerender: function() {
      this.renderedContent = this.md.render(
        this.notes[this.selectedNote].content
      );
    }
  }
};
</script>

<style scoped>
@import "../css/bulma.css";
</style>

<style lang="css" scoped></style>
