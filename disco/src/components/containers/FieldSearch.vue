<template>
<VField
  class="FieldSearch"
  placeholder="Find games by title"
  @inputChanged="searchTermChanged(...arguments)"
  :userInput="searchTerm"
/>
</template>

<script>
import VField from '../views/VField'

export default {
  components: {
    VField,
  },
  props: {
    searchTerm: {
      type: String,
    },
  },
  methods: {
    searchTermChanged() {
      this.$emit('searchTermChanged', arguments[0])
    },
  },
}
</script>
