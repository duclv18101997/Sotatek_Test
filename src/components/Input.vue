<template>
  <div class="text-input" :class="{ 'text-input--error': isError }">
    <input
      type="text"
      :placeholder="placeholder"
      ref="input"
      :value="valueClone"
      @input="setValueText"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
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
    }
  },
  watch: {
    inputValue() {
      this.valueClone = this.inputValue
    },
  },
  created() {
    this.valueClone = this.inputValue
  },
  methods: {
    setValueText(e) {
      if (e.target.value != this.valueClone) {
        this.valueClone = e.target.value
        this.$emit('input', this.valueClone)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.text-input {
  input {
        height: 32px;
        width: 100%;
        text-align: left;
        padding: 10px;
        background: #FFFFFF;
        border: 1px solid #BDBDBD;
        border-radius: 5px;
      }
}
</style>
