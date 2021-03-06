import Vue from "vue";
import Vuex from "vuex";
import todoList from "./todoList";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: { todoList },
});
export default store;
