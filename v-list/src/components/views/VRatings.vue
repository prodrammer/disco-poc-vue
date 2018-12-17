<template>
<div class="VRatings">
  <div class="rowTop">
    <h1>{{ title }}</h1>

    <div class="ratings"> <!-- TODO: Ing Shaun why was one text p and one div? Huh? I don't remember. -->
      {{ hypes }} <span class="heart">❤</span> | {{ rating }}% ({{ numRatings }})
    </div>
  </div>

  <div class="rowBottom">Released in {{ releaseMonth }} {{ releaseYear }}</div>
</div>
</template>

<script>
const locale = 'en-us'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    hypes: {
      type: Number,
      required: true,
      default: 0,
    },

    numRatings: {
      type: Number,
      required: false,
      default: 0,
    },

    rating: {
      type: Number,
      required: false,
      default: 0,
    },

    releaseDate: {
      type: Number,
      required: true,
    },
  },

  computed: {
    date() {
      return new Date(this.releaseDate)
    },

    releaseMonth() {
      return this.date.toLocaleString(locale, { month: 'short' })
    },

    releaseYear() {
      return this.date.getFullYear()
    },
  },
}
</script>

<style lang="scss">
.VRatings {
  display: flex;
  flex-direction: column;

  .ratings {
    color: $colorsTextLight;
    margin: 1rem 0;
  }
  .heart {
    color: $colorsLove;
  }

  // TODO: Ing Shaun what is the space between each item?
  // (title and ratings, ratings and release)
  // There is no spacing
  .rowTop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    h1 {
      min-width: 400px; // hack to force ratings to next row in SingleGame
      margin: 0;
    }
  }
  .rowBottom {
    @extend %typeParagraph;
  }
}
</style>
