<template>
  <div class="add-todo">
    <div class="add-todo__header">New Task</div>
    <div v-if="!isDesktop" class="add-todo__mobile">
      <div class="add-button">
        <span>Click to add task: </span>
        <button @click="isShowAddFormMobile = !isShowAddFormMobile">
          Add +
        </button>
      </div>
      <transition name="component-fade" mode="out-in">
        <FormAddTodo
          v-if="isShowAddFormMobile"
          :dataProps="formData"
          type="Add"
          @getFormData="getFormData"
        />
      </transition>
    </div>
    <FormAddTodo
      v-if="isDesktop"
      :dataProps="formData"
      type="Add"
      @getFormData="getFormData"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import FormAddTodo from "./FormAddTodo.vue"
import mixin from '../mixins/mixin'
export default {
  mixins: [mixin],
  components: {
    FormAddTodo
  },
  data() {
    return {
      formData: {
        title: "",
        description: "",
        dueDate: new Date(),
        priority: "Normal",
        key: new Date().getTime(),
      },
      isShowAddFormMobile: false
    };
  },
  computed: {
    ...mapGetters('todoList', {
      todoList: 'getTodoList',
    }),
  },
  methods: {
    ...mapMutations('todoList', ['ADD_TODO_LIST']),
    getFormData(data) {
      let currentListTodo = JSON.parse(JSON.stringify(this.todoList))
      currentListTodo.push(data);
      // add data to localStorage
      this.ADD_TODO_LIST(currentListTodo)
      if (!this.isDesktop) {
        this.isShowAddFormMobile = false
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active ở các phiên bản trước 2.1.8 */ {
  opacity: 0;
}
.add-todo {
  height: 100%;
  border-right: 1px solid #000000;
  outline: none;
  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid #000000;
  }
  @media (max-width: 1024px) {
    height: auto;
  }
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
  &__mobile {
    padding: 0 16px;
    .add-button {
      text-align: left;
      margin-bottom: 16px;
      button {
        padding: 4px 16px;
        color: #ffffff;
        -family: Arimo;
        -size: 15px;
        text-align: center;
        background: #5cb85c;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
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
