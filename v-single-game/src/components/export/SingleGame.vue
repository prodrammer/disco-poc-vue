<template>
<div class="SingleGame">
  <div
    v-if="id"
    :class="[ addAnimation ? 'fadeIn' : '' ]"
    @animationend="removeAnimation"
  >

    <div class="gameCover">
      <img :src="imgUrlClean" :alt="title + ' game cover'">
    </div>

    <VRatings
      :title="title"
      :hypes="hypes"
      :numRatings="numRatings"
      :rating="rating"
      :releaseDate="releaseDate"
    />

  </div>
</div>
</template>

<script>
import VRatings from '../views/VRatings'

export default {
  components: {
    VRatings,
  },

  props: {
    hypes: {
      type: Number,
      // required: true,
    },

    id: {
      type: Number,
      // required: true,
    },

    numRatings: {
      type: Number,
      // required: true,
    },

    rating: {
      type: Number,
      // required: true,
    },

    releaseDate: {
      type: Number,
      // required: true,
    },

    title: {
      type: String,
      // required: true,
    },

    imgUrl: {
      type: String,
      // required: true,
    },
  },

  data: _ => ({
    addAnimation: false,
  }),
  computed: {
    imgUrlClean() {
      return this.imgUrl !== null ? 'http:' + this.imgUrl : ''
    },
  },
  methods: {
    removeAnimation() {
      this.addAnimation = false
    },
  },
}
</script>

<style lang="scss">
@import 'src/styles/mixins';
$coverLength: 210px;

.SingleGame {
  padding: 72px 48px;

  .gameCover {
    width: $coverLength;
    height: $coverLength;

    margin-bottom: 36px;

    img {
      width: 100%;
      height: 100%;
      object-position: 0 0;
      object-fit: cover;
    }
  }

  // Animations:
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-24px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .fadeIn {
    @include anim();
    animation-name: fadeIn;
  }
}
</style>
