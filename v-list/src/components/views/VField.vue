<template>
<div class="VField">
  <VInput
    :label="label"
    :errorHandler="errorHandler"
  >
    <input
      v-bind="$attrs"
      v-model.trim="updatedInput"
      :placeholder="placeholder"
      class="input"
    />

  </VInput>
</div>
</template>

<script>
import VInput from './VInput'

export default {
  components: {
    VInput,
  },

  inheritAttrs: false,

  props: {
    errorHandler: {
      type: Function,
      required: false,
    },

    label: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    userInput: {
      type: String,
      default: '',
    },
  },

  data: _ => ({
    updatedInput: '',
  }),
  mounted() {
    this.updatedInput = this.userInput
  },
  updated() {
    this.updatedInput = this.userInput
  },
  computed: {
    error() {
      if (this.errorHandler) return this.errorHandler(this.updatedInput)
    },
  },

  watch: {
    updatedInput() {
      this.$emit('inputChanged', this.updatedInput)
    },
  },
}
</script>

<style lang="scss">
.VField {
  position: relative;
}
</style>
