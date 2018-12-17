<template>
<div
  class="VGameCard"
  :class="[ selected ? 'selected' : 'deselected' ]"
  @click="$emit('gameSelected', id)"
>
  <VRatings
    :title="title"
    :hypes="hypes"
    :rating="rating"
    :numRatings="numRatings"
    :releaseDate="releaseDate"
  />

  <div class="divider" />

  <div class="summary">{{ summary }}</div>
</div>
</template>

<script>
import VRatings from './VRatings'

export default {
  components: {
    VRatings,
  },

  props: {
    hypes: {
      type: Number,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },

    numRatings: {
      type: Number,
      required: false,
    },

    rating: {
      type: Number,
      required: false,
    },

    releaseDate: {
      type: Number,
      required: true,
    },

    selected: {
      type: Boolean,
      default: false,
    },

    summary: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import 'src/styles/mixins';

// Styles for animation:
// Note: `extend` doesn't work in animation
@mixin cardDown() {
  position: inherit;
  left: 0;
  top: 0;
  box-shadow: 5px 6px 7px 0px $colorsTextLight;
}
@mixin cardUp() {
  position: relative;
  left: -13px;
  top: -14px;
  box-shadow: 18px 20px 10px 0px $colorsTextLight;
}

// Styles
.VGameCard {
  height: 180px;
  display: flex;
  flex-direction: column;
  background: $colorsPaper;
  border-radius: 4px;
  box-shadow: 5px 6px 7px 0px $colorsTextLight;
  padding: 18px 24px 0px;

  & + .VGameCard {
    margin-top: 24px;
  }

  &.selected {
    @include cardUp();
    @include anim();
    animation-name: popUp;
  }

  &.deselected {
    @include anim();
    animation-name: setDown;
  }

  .divider {
    width: 90px;
    height: 1px;
    margin-top: 12px;
    margin-bottom: 9px;
    background: $colorsTextLight;
  }

  .summary {
    // TODO: Ing Shaun what is line spacing as summary looks odd!
    overflow-y: auto;
    @extend %typeParagraph;
    color: $colorsText;
    flex: 1;
    width: 100%;
  }

  // Animations:
  @keyframes popUp {
    0% {
      @include cardDown();
    }
    100% {
      @include cardUp();
    }
  }

  @keyframes setDown {
    0% {
      @include cardUp();
    }
    100% {
      @include cardDown();
    }
  }
}
</style>
