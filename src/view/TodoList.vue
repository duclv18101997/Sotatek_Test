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
  min-height: 100vh;
  border: 1px solid #000000;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
}
</style>