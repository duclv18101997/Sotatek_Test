<template>
  <div class="add-todo">
    <div class="add-todo__header">New Task</div>
    <div class="add-form">
      <div class="add-form__title">
        <Input placeholder="Add new task..." />
      </div>
      <div class="add-form__description">
        <p class="input-label">Description</p>
        <textarea />
      </div>
      <div class="add-form__addition-info">
        <div class="date-input">
          <p class="input-label">Due Date</p>
          <div class="d-flex">
            <DatePicker class="date-picker" />
            <img src="../assets/calendar.svg" />
          </div>
        </div>
        <div class="piority">
          <p class="input-label">Piority</p>
          <Dropdown :options="piorityOption"/>
        </div>
      </div>
    </div>
    <div class="button-action">
      <button class="button-action__add">Add</button>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vuejs-datepicker'
import Input from './Input.vue'
import Dropdown from './Dropdown.vue'
export default {
  components: {
    DatePicker,
    Input,
    Dropdown
  },
  data() {
    return {
      piorityOption: [
        {
          lable: 'High',
          id: 1
        },
        {
          lable: 'Normal',
          id: 2
        },
        {
          lable: 'Low',
          id: 3
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.add-todo {
  height: 100%;
  border-right: 1px solid #000000;
  &__header {
    font-weight: bold;
    text-align: center;
    color: #000000;
    margin-bottom: 42px;
    padding: 32px 32px 0px;
  }
  .add-form {
    padding: 0 32px;
    .input-label {
      font-size: 12px;
      font-weight: bold;
      color: #000000;
      text-align: left;
      margin-bottom: 8px;
    }
    &__title {
      margin-bottom: 24px;
    }
    &__description {
      margin-bottom: 24px;
      textarea {
        width: 100%;
        height: 125px;
        max-height: 125px;
        border: 1px solid #000000;
        outline: none;
        padding: 10px;
      }
    }
    &__addition-info {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 32px;
      .date-input, .piority {
        width: 100%;
      }
      .date-picker {
        /deep/ input {
          height: 32px !important;
        width: 100%;
        }
      }
    }
  }
  .button-action {
    padding: 0 32px;
    &__add {
      width: 100%;
      height: 32px;
      color: #FFFFFF;
      font-family: Arimo;
      font-size: 15px;
      text-align: center;
      background: #5CB85C;
      border: none;
      border-radius: 10px;
    }
  }
}
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>