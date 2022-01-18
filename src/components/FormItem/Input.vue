<template>
  <div class="text-input" :class="{ 'text-input--error': isError }">
    <input
      type="text"
      :placeholder="placeholder"
      ref="input"
      :value="valueClone"
      :class="{ 'input-error': isError }"
      @input="setValueText"
    />
    <div class="error-message" v-if="isError">Please input title</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputValue: {
      type: [String, Array, null],
      default: null,
    },
    isError: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      valueClone: null,
    };
  },
  watch: {
    inputValue() {
      this.valueClone = this.inputValue;
    },
  },
  created() {
    this.valueClone = this.inputValue;
  },
  methods: {
    setValueText(e) {
      if (e.target.value != this.valueClone) {
        this.valueClone = e.target.value;
        this.$emit("input", this.valueClone);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-input {
  input {
    height: 32px;
    width: 100%;
    text-align: left;
    padding: 10px;
    background: #ffffff;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    outline: none;
    font-family: 'Source Sans Pro';
  }
  .input-error {
    border: 1px solid #ed5d5d;
  }
  .error-message {
    font-size: 14px;
    color: #ed5d5d;
    text-align: left;
    margin-top: 4px;
  }
}
</style>
