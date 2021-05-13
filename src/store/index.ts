import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settingsShowUser: true,
    settingsShowChat: true
  },
  mutations: {
    settingsShowUser(state, data) {
      state.settingsShowUser = data;
    },
    settingsShowChat(state, data) {
      state.settingsShowChat = data;
    }
  },
  actions: {},
  modules: {}
});
