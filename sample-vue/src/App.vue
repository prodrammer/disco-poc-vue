<template>
  <div id="app">
    <v-list ref="list" selectable @selectedGameChanged="selectedGameChanged"></v-list>
    <v-single-game :id="id" :hypes="hypes" :numRatings="numRatings" :rating="rating" :releaseDate="releaseDate" :title="title" :imgUrl="imgUrl"></v-single-game>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      selectedGame: undefined
    }
  },
  computed: {
    id () {
      return this.selectedGame && this.selectedGame.id
    },
    hypes () {
      return this.selectedGame && this.selectedGame.popularity
    },
    numRatings () {
      return this.selectedGame && this.selectedGame.rating_count
    },
    rating () {
      return this.selectedGame && this.selectedGame.rating
    },
    releaseDate () {
      return this.selectedGame && this.selectedGame.created_at
    },
    title () {
      return this.selectedGame && this.selectedGame.name
    },
    imgUrl () {
      if (this.selectedGame) {
        if (this.selectedGame.cover) return this.selectedGame.cover.url
        if (this.selectedGame.screenshots) return this.selectedGame.screenshots[0].url
      }

      return undefined
    }
  },
  methods: {
    selectedGameChanged (e) {
      this.selectedGame = e.detail[1]
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
