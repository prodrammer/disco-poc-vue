<template>
  <div id="app" class="demo-container">
    <div class="demo-container__main">
      <disco-list-game ref="list" selectable @selectedGameChanged="selectedGameChanged"></disco-list-game>
    </div>
    <div class="demo-container__sidebar">
      <disco-single-game :id="id" :hypes="hypes" :num-ratings="numRatings" :rating="rating" :release-date="releaseDate" :title="title" :img-url="imgUrl"></disco-single-game>
    </div>
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
      if (this.selectedGame && this.selectedGame.created_at) {
        const date = new Date(this.selectedGame.created_at)
        const month = date.toLocaleDateString('en-us', { month: 'long' })
        const year = date.getFullYear()
        return `${month} ${year}`
      }
      return undefined
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
html { height: 100%; }

body {
  margin: 0;
  min-height: 100%;
  padding: 0;
}

.demo-container {
  display: grid;
  grid-template-columns: auto 480px;
  grid-template-rows: auto;
  grid-template-areas: "main sidebar";

  align-content: stretch;
  justify-content: stretch;
  height: 100vh;
  width: 100vw;
}

.demo-container__sidebar {
  grid-area: sidebar;

  background-color: #f3f1f1;
  border-left: 1px solid #cfcfcf;
}

.demo-container__main {
  grid-area: main;
  overflow-y: scroll;
}
</style>
