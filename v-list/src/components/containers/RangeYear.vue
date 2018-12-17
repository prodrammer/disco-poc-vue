<template>
<div class="RangeYear">
  <VInput
    label="Release year"
    :error="error"
  >
    <div class="inputs">
      <VField
        placeholder="1900"
        :userInput="from"
        type="number"
        @inputChanged="updateInput($event, 'from')"
        @keyup.native.enter="fetchGames"
        @keydown.native="checkKey($event, 'from')"
      />
      <!-- TODO: Is min and max required? They weren't in the wireframes. Let's take it out, idk how the API will handle this yet.-->

      <div class="labelTo">to</div>

      <VField
        placeholder="2018"
        :userInput="to"
        type="number"
        @inputChanged="updateInput($event, 'to')"
        @keyup.native.enter="fetchGames"
        @keydown.native="checkKey($event, 'to')"
      />
    </div>
  </VInput>
</div>
</template>

<script>
import VField from '../views/VField'
import VInput from '../views/VInput'

export default {
  components: {
    VField,
    VInput,
  },

  data: _ => ({
    from: '',
    to: '',
    timeout: null,
  }),

  computed: {
    error() {
      // Theoretically a user can make an open-ended request but let's not go there...
      if (this.to && this.from && +this.to < +this.from)
        return 'Reverse time-travel not allowed'
    },
  },

  methods: {
    checkKey(e, which) {
      if (
        [69, 187, 189].includes(e.keyCode) |
        (e.key.match(/\d/gim) && this[which].length >= 4)
      ) {
        e.preventDefault()
      }
    },
    emitYearChanges(from, to) {
      this.$emit('yearFilterChanged', from, to)
    },
    fetchGames() {
      if (!this.error) this.emitYearChanges(this.from, this.to)
    },
    //handles pasting
    updateInput(n, which) {
      this[which] = n
        .toString()
        .replace(/\D/g, '')
        .slice(0, 4)
    },
  },
  watch: {
    from: function(current) {
      if (!this.error) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.emitYearChanges, 500, current, this.to)
      }
    },
    to: function(current) {
      if (!this.error) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.emitYearChanges, 500, this.from, current)
      }
    },
  },
}
</script>

<style lang="scss">
.RangeYear {
  .VInput {
    .inputs {
      display: flex;
      flex-direction: row;
      align-items: center;

      .label {
        display: none;
      }

      .error {
        display: none;
      }
    }
  }

  .labelTo {
    @extend %typeParagraph;
    margin: 0 1rem;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
