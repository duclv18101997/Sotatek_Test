export const name = "todoList";
const LOCAL_STORAGE_KEY = "todoList";
export default {
  namespaced: true,
  state: {
    todoList: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  },
  getters: {
    getTodoList: (state) => {
      state.todoList.sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      return state.todoList
    },
  },
  mutations: {
    ADD_TODO_LIST(state, payload) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      state.todoList =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    },
  },
};
