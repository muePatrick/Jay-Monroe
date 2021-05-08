import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    draggedNote: undefined,
    draggedUuid: ""
  },
  mutations: {
    dragNote(state, note) {
      state.draggedNote = note.note;
      state.draggedUuid = note.uuid;
      console.log(note);
    }
  },
  actions: {},
  modules: {}
});
