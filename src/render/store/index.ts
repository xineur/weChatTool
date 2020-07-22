import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: Object.assign({
  }, state),
  getters: Object.assign({
  }, getters),
  mutations: Object.assign({
  }, mutations),
  actions: Object.assign({
  }, actions),
  modules
});
