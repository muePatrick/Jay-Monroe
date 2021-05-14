import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function initialValues() {
  const a = localStorage.getItem("settingsShowUser") == "true" ? true : false;
  const b = localStorage.getItem("settingsShowChat") == "true" ? true : false;
  return { a, b };
}

export default new Vuex.Store({
  state: {
    settingsShowUser: initialValues()["a"],
    settingsShowChat: initialValues()["b"]
  },
  mutations: {
    settingsShowUser(state, data) {
      state.settingsShowUser = data;
      localStorage.setItem("settingsShowUser", data);
    },
    settingsShowChat(state, data) {
      state.settingsShowChat = data;
      localStorage.setItem("settingsShowChat", data);
    }
  },
  actions: {},
  modules: {}
});
