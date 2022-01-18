<template>
  <div class="todo-container">
    <div class="todo-container__header">To do list</div>
    <div class="search-todo">
      <Input
        placeholder="Search..."
        @input="handleSearchTodo"
        :inputValue="textSearchTodo"
      />
    </div>
    <div class="list-todo">
      <div v-for="item in listTodoItem" :key="item.key">
        <TodoItem
          :info="item"
          @selectTodo="selectTodo"
          @removeItem="handleRemoveTodo"
          @handleUpdateTodo="handleUpdateTodo"
        />
      </div>
      <div v-if="textSearchTodo && !listTodoItem.length" class="text-not-found">
        Not found task with title {{ textSearchTodo }}
      </div>
    </div>
    <div class="bulk-action" v-if="listTodoSelected.length">
      <p>Bulk Action:</p>
      <div class="button-action">
        <button class="btn btn--done">Done</button>
        <button class="btn btn--remove" @click="handleRemoveCheckedTodo">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Input from "./FormItem/Input.vue";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    Input,
    TodoItem,
  },
  data() {
    return {
      listTodoItem: [],
      listTodoSelected: [],
      textSearchTodo: ''
    };
  },
  created() {
    this.listTodoItem = [...this.todoList]
  },
  computed: {
    ...mapGetters('todoList', {
      todoList: 'getTodoList',
    }),
  },
  watch: {
    todoList: {
      handler(val) {
        this.listTodoItem = val
      }
    },
    textSearchTodo: {
      handler(val) {
        this.filterTodoItem(val)
      }
    }
  },
  methods: {
    ...mapMutations('todoList', ['ADD_TODO_LIST']),
    selectTodo(value) {
      if (value.checked) {
        this.listTodoSelected.push(value.key);
      } else {
        this.listTodoSelected.map((item, index) => {
          if (item == value.key) {
            this.listTodoSelected.splice(index, 1);
          }
        });
      }
      this.listTodoSelected = [...new Set(this.listTodoSelected)]
    },
    handleRemoveTodo(key) {
      let currentTodoList = JSON.parse(JSON.stringify(this.todoList))
      currentTodoList.map((item, index) => {
        if (item.key == key) {
          currentTodoList.splice(index, 1)
        }
      })
      this.ADD_TODO_LIST(currentTodoList)
      if(this.listTodoSelected.length) {
        this.listTodoSelected = this.listTodoSelected.filter(item => item != key)
      }
    },
    handleRemoveCheckedTodo() {
      let currentTodoList = JSON.parse(JSON.stringify(this.todoList))
      currentTodoList.map((item) => {
        if (this.listTodoSelected.includes(item.key)) {
          currentTodoList = currentTodoList.filter(val => val.key != item.key)
        }
      })
      this.listTodoSelected.length = 0
      this.ADD_TODO_LIST(currentTodoList)
    },
    handleSearchTodo(text) {
      this.textSearchTodo = text
    },
    filterTodoItem(text) {
      let timeOut = null
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        // search todo after input 3s
        this.listTodoItem = this.todoList.filter(item => item.title.toUpperCase().includes(text.toUpperCase()))
      }, 3000)
    },
    handleUpdateTodo() {
      this.textSearchTodo = ''
    }
  },
};
</script>
<style lang="scss" scoped>
.todo-container {
  height: 100%;
  outline: none;
  position: relative;
  &__header {
    font-weight: bold;
    text-align: center;
    color: #000000;
    margin-bottom: 42px;
    padding: 32px 32px 0px;
    @media (max-width: 1024px) {
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }
  .search-todo {
    padding: 0 32px;
    margin-bottom: 16px;
    @media (max-width: 1024px) {
      padding: 0 16px;
    }
  }
  .list-todo {
    padding: 0 32px;
    max-height: calc(100vh - 64px - 290px);
    overflow-y: auto;
    @media (max-width: 1024px) {
      padding: 0 16px;
    }
    .text-not-found {
      color: #ed5d5d;
      font-size: 14px;
    }
  }
  .bulk-action {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 82px;
    background: #e0e0e0;
    border-top: 1px solid #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    @media (max-width: 767px) {
      padding: 0 16px;
    }
    .button-action {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        border-radius: 4px;
        font-size: 12px;
        color: #ffffff;
        height: 36px;
        width: 110px;
        cursor: pointer;
        @media (max-width: 767px) {
          width: 80px;
        }

        &--done {
          background: #2196f3;
        }
        &--remove {
          background: #d9534f;
        }
      }
    }
  }
}
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::-webkit-scrollbar {
  width: 9px;
  background: #ffffff;
  border-radius: 1px;
}
::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
  border-left: 2px solid #ffffff;
  border-right: 1px solid #ffffff;
}
</style>
