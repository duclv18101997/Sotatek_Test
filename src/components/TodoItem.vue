<template>
  <div class="item-todo-container">
    <div class="item-todo">
      <div class="d-flex-center">
        <input type="checkbox" :checked="isChecked" @change="handleCheckTodo" />
        <div class="item-todo__label" :title="info.title">{{ info.title }}</div>
      </div>
      <div class="button-action">
        <button
          class="btn btn--detail"
          @click="isViewDetailTodo = !isViewDetailTodo"
        >
          Detail
        </button>
        <button class="btn btn--remove" @click="handleRemoveItem">Remove</button>
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="item-detail" v-if="isViewDetailTodo">
        <FormAddTodo :dataProps="info" type="Update"  @getFormData="getFormData"/>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import FormAddTodo from "./FormAddTodo.vue"
export default {
  components: {
    FormAddTodo,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isViewDetailTodo: false,
      isChecked: false,
    };
  },
  computed: {
    ...mapGetters('todoList', {
      todoList: 'getTodoList',
    }),
  },
  methods: {
    ...mapMutations('todoList', ['ADD_TODO_LIST']),
    handleCheckTodo() {
      this.isChecked = !this.isChecked;
      this.$emit("selectTodo", {
        checked: this.isChecked,
        key: this.info.key,
      });
    },
    handleRemoveItem() {
      this.$emit("removeItem", this.info.key);
    },
    getFormData(data) {
      let currentTodoList = JSON.parse(JSON.stringify(this.todoList))
      currentTodoList.map((item, index) => {
        if(item.key == data.key) {
          currentTodoList[index] = {...data}
        }
      })
      this.ADD_TODO_LIST(currentTodoList)
      this.isViewDetailTodo = false
      this.$emit('handleUpdateTodo')
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
.item-todo-container {
  margin-bottom: 16px;
}
.item-todo {
  height: 64px;
  background: #ffffff;
  border: 1px solid #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  @media (max-width: 767px) {
    padding: 0 8px;
  }
  &__label {
    margin-left: 8px;
    max-width: 360px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    @media (max-width: 1024px) {
      max-width: calc(100vw - 350px)
    }
    @media (max-width: 767px) {
      max-width: calc(100vw - 222px)
    }
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
      height: 27px;
      width: 93px;
      cursor: pointer;
      @media (max-width: 767px) {
        width: fit-content;
        padding: 0 8px;
      }

      &--detail {
        background: #00bcd4;
      }
      &--remove {
        background: #d9534f;
      }
    }
  }
}
.item-detail {
  border: 1px solid #000000;
  border-top: none;
  padding: 32px 0;
  @media (max-width: 1024px) {
    padding: 16px 8px;
  }
}
.d-flex-center {
  display: flex;
  align-items: center;
}
</style>
