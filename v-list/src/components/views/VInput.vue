<template>
    <div class="VInput">
        <label class="label">{{ label }}</label>

        <div class="inputContainer"><slot /></div>

        <div class="error">{{ error }}</div>
    </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.VInput {
  width: 100%;
  display: flex;
  flex-direction: column;

  .label {
    width: 100%;
    height: 0.8rem;
    display: block;
    margin-bottom: 9px;
  }

  .error {
    width: 100%;
    height: 0.8rem;
    margin-top: 6px;
    @extend %typeCaption;
    color: $colorsLove;
  }

  .inputContainer {
    .input {
      width: 100%;
      height: 32px;
      border: 1px solid $colorsTextLight;
      border-radius: 4px;
      padding: 0 1rem;
      @extend %typeParagraph;

      &::placeholder {
        @extend %typeParagraphLight;
      }
    }
  }
}
</style>
