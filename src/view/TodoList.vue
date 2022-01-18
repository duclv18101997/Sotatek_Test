<template>
  <div class="todo-list-container">
    <div class="todo-wrapper">
      <AddTodo />
      <ListTodo />
    </div>
  </div>
</template>
<script>
import AddTodo from '../components/AddTodo.vue'
import ListTodo from '../components/ListTodo.vue'
export default {
  components: {
    AddTodo,
    ListTodo
  }
}
</script>
<style lang="scss" scoped>
.todo-list-container {
 display: flex;
  justify-content: center;
}
.todo-wrapper {
  width: 1209px;
  min-height: calc(100vh - 64px);
  margin: 32px 0px;
  border: 1px solid #000000;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 32px;
  }
  @media (max-width: 767px) {
    margin: 16px;
    min-height: calc(100vh - 32px);
  }
}
</style>