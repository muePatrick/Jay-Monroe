import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function initialValues() {
  const a = localStorage.getItem("settingsShowUser") == "true" ? true : false;
  const b = localStorage.getItem("settingsShowChat") == "true" ? true : false;
  const c =
    localStorage.getItem("settingsNotesMenuDocked") == "true" ? true : false;
  const d =
    localStorage.getItem("settingsWysiwyg") == "wysiwyg"
      ? "wysiwyg"
      : "markdown";
  console.log(localStorage.getItem("settingsWysiwyg"));
  return { a, b, c, d };
}

export default new Vuex.Store({
  state: {
    settingsShowUser: initialValues()["a"],
    settingsShowChat: initialValues()["b"],
    settingsNotesMenuDocked: initialValues()["c"],
    settingsWysiwyg: initialValues()["d"]
  },
  mutations: {
    settingsShowUser(state, data) {
      state.settingsShowUser = data;
      localStorage.setItem("settingsShowUser", data);
    },
    settingsShowChat(state, data) {
      state.settingsShowChat = data;
      localStorage.setItem("settingsShowChat", data);
    },
    settingsNotesMenuDocked(state, data) {
      state.settingsNotesMenuDocked = data;
      localStorage.setItem("settingsNotesMenuDocked", data);
    },
    settingsWysiwyg(state, data) {
      state.settingsWysiwyg = data;
      localStorage.setItem("settingsWysiwyg", data);
    }
    // TODO add parameter to see if editor is on mobile (for auto notesMenuDock and Start with wysiwyg)
  },
  actions: {},
  modules: {}
});
