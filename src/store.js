import Vue from 'vue';
import Vuex from 'vuex';

import toDate from 'normalize-date';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    error: false,
  },
  mutations: {
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SET_ERROR(state, value) {
      state.error = value;
    },
  },
  actions: {
    addMessage({ commit }, message) {
      const date = message.date ? toDate(message.date) : Date.now();

      const source = message.origin || 'OTHER';
      const author = message.author || source;

      commit('ADD_MESSAGE', {
        ...message,
        date,
        author,
        origin: source,
      });
    },
  },
  getters: {
    allMessages: state => state.messages,
  },
});
