<template>
  <div class="dropdown-container" v-click-outside="closeMenu">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      <div>123</div>
      <div class="pp_icon--box24">
        <img src="../assets/chevron-down.svg" />
      </div>
    </div>
    <div class="dropdown-menu" v-if="isOpen">
      <div v-for="(option, index) in options" :key="index">
        <div class="dropdown-menu--option">
          <label class="label" style="padding: 10px"
            >{{ option.lable }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside,
  },
  props: {
    options: {
      type: Array,
      require: true,
      default: () => [],
    },
    value: {
      type: String,
    },
    placeholder: {
      require: true,
      type: String,
      default: 'フィードバックを選択する',
    },
    item: {
      type: [Array, Object],
    },
    listSelectId: {
      type: Array,
    },
  },
  created() {
  },
  data() {
    return {
      isOpen: false,
      isChecked: false,
      listIdSelected: [],
      valueInputSearch: '',
      listLabelSelected: [],
    }
  },
  watch: {
  },
  methods: {
    closeMenu() {
      this.isOpen = false
    },
    chooseData(isChecked, data) {
      console.log('isChecked, data', isChecked, data)
    },
  },
}
</script>

<style lang="scss" scoped>
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
.dropdown-container {
  height: 32px;
  width: 100%;
  border: 1px solid #000000;
  position: relative;
  cursor: pointer;
  .dropdown-input {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-menu {
    position: absolute;
    top: 40px;
    z-index: 1;
    background: #ffffff;
    box-shadow: 0px 1px 8px rgba(102, 102, 102, 0.2);
    border-radius: 2px;
    width: 100%;
    min-height: 48px;
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 20px;
    &--option {
      padding: 8px 24px;
      color: #000000;
      font-weight: bold;
      &:hover {
        background: #007BC3;
        color: #ffffff;
      }
    }

  }
}
</style>
