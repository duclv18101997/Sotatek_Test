<template>
  <div class="form-add-todo">
    <div class="add-form">
      <div class="add-form__title">
        <Input
          :placeholder="
            type == 'Add' ? 'Add new task...' : 'Enter task title...'
          "
          :inputValue="formData.title"
          @input="handleInputTitle"
          :isError="formError.errorTitle"
        />
      </div>
      <div class="add-form__description">
        <p class="input-label">Description</p>
        <textarea v-model="formData.description" />
      </div>
      <div class="add-form__addition-info">
        <div class="date-input">
          <p class="input-label">Due Date</p>
          <div class="date-picker-container">
            <DatePicker
              class="date-picker"
              :class="{ 'date-picker--error': formError.errorDueDate }"
              :calendar-button="true"
              :calendar-button-icon="'fa fa-calendar'"
              :value="formData.dueDate"
              @selected="onPickDate"
            >
            </DatePicker>
            <div class="error-message" v-if="formError.errorDueDate">
              Please choose date in the future
            </div>
          </div>
        </div>
        <div class="priority">
          <p class="input-label">Priority</p>
          <Dropdown
            :options="priorityOption"
            :value="formData.priority"
            @handleSelect="handleSelectPriority"
          />
        </div>
      </div>
    </div>
    <div v-if="isDuplicateTitle" class="error-duplicate">
      Title {{ this.formData.title }} already exists!
    </div>
    <div class="button-action">
      <button class="button-action__add" @click="handleAddTodo">
        {{ type == "Add" ? "Add" : "Update" }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import DatePicker from "vuejs-datepicker";
import Input from "./FormItem/Input.vue";
import Dropdown from "./FormItem/Dropdown.vue";
export default {
  components: {
    DatePicker,
    Input,
    Dropdown,
  },
  props: {
    dataProps: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      priorityOption: [
        {
          label: "High",
          id: 1,
        },
        {
          label: "Normal",
          id: 2,
        },
        {
          label: "Low",
          id: 3,
        },
      ],
      formError: {
        errorTitle: false,
        errorDueDate: false,
      },
      isValidData: false,
      formData: {},
      isDuplicateTitle: false
    };
  },
  created() {
    this.formData = { ...this.dataProps }
  },
  computed: {
    ...mapGetters('todoList', {
      todoList: 'getTodoList',
    }),
    listExistTitle() {
      let listTitle = []
      this.todoList.map(item => {
        if (item.title != this.dataProps.title) {
          listTitle.push(item.title)
        }
      })
      return listTitle
    }
  },
  methods: {
    ...mapMutations('todoList', ['ADD_TODO_LIST']),
    handleInputTitle(val) {
      this.isDuplicateTitle = false
      this.formData.title = val
    },
    onPickDate(val) {
      this.formData.dueDate = val
    },
    handleSelectPriority(val) {
      this.formData.priority = val
    },
    handleAddTodo() {
      this.validateForm(this.formData)
      this.checkDuplicateTitle(this.formData.title)
      if (!this.isValidData && !this.isDuplicateTitle) {
        this.$emit('getFormData', this.formData)
        this.type == 'Add' ? this.clearInput() : ''
      }
    },
    validateForm(val) {
      this.formError.errorTitle = val.title ? false : true
      let dateToday = new Date().getFullYear() + '/' + new Date().getMonth() + 1 + '/' + new Date().getDate()
      let diffDate = new Date(dateToday.toString()).getTime() - new Date(val.dueDate).getTime()
      this.formError.errorDueDate = diffDate >= 0 ? true : false
      this.isValidData =
        this.formError.errorTitle || this.formError.errorDueDate;
    },
    clearInput() {
      this.formData = {
        title: "",
        description: "",
        dueDate: new Date(),
        priority: "Normal",
        key: new Date().getTime(),
      };
    },
    checkDuplicateTitle(title) {
      this.isDuplicateTitle = this.listExistTitle.includes(title)
    }
  },
};
</script>

<style lang="scss" scoped>
.form-add-todo {
  @media (max-width: 1024px) {
    padding-bottom: 16px;
  }
}
.add-form {
    padding: 0 32px;
    @media (max-width: 1024px) {
      padding: 0;
    }
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
        font-family: 'Source Sans Pro';
      }
    }
    &__addition-info {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 32px;
      .date-input,
      .priority {
        width: 100%;
      }
      .date-picker-container {
        display: flex;
        flex-direction: column;
      }
      .date-picker {
        width: 100%;
        /deep/ {
          input {
            height: 32px !important;
            width: 100%;
            padding: 8px;
          }
          .vdp-datepicker {
            &__calendar-button {
              position: absolute;
              top: 8px;
              right: 8px;
            }
          }
        }
        &--error {
          /deep/ {
            input {
              border: 1px solid #ed5d5d;
            }
          }
        }
      }
    }
  }
  .button-action {
    padding: 0 32px;
    @media (max-width: 1024px) {
      padding: 0;
    }
    &__add {
      width: 100%;
      height: 32px;
      color: #ffffff;
      font-family: Arimo;
      font-size: 15px;
      text-align: center;
      background: #5cb85c;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    &--disable {
      background: #dcdcdc;
    }
  }
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.error-message {
  font-size: 14px;
  color: #ed5d5d;
  text-align: left;
  margin-top: 4px;
}
.error-duplicate {
  font-size: 14px;
  color: #ed5d5d;
  text-align: left;
  text-align: center;
  margin-bottom: 8px;
}
// ::-webkit-scrollbar {
//   width: 9px;
//   background: #ffffff;
//   border-radius: 1px;
// }
// ::-webkit-scrollbar-thumb {
//   background: #c4c4c4;
//   border-radius: 10px;
//   border-left: 2px solid #ffffff;
//   border-right: 1px solid #ffffff;
// }
</style>
