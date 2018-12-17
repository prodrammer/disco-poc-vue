<template>
<div class="VGameFiltersAndList">
  <div class="filterBar">
    <FieldSearch
      label="Search"
      placeholder="Search for games"
      @searchTermChanged="applySearchTerm(...arguments)"
      :searchTerm="searchTerm"
    />
    <div class="filters">
      <RangeYear @yearFilterChanged="applyYearFilter(...arguments)"/>
      <VDropdown :options="dropdownOptions" selected="gameTitle" @dropdownValueChanged="applySort(...arguments)"/>
    </div>
  </div>

  <VGameCard
    v-for="({ id, name, created_at, popularity, esrb, rating_count, rating, summary }) in games"
    :key="id"
    :id="id"
    :title="name"
    :hypes="popularity"
    :numRatings="rating_count"
    :rating="rating"
    :releaseDate="created_at"
    :selected="selectedGameId === id"
    :summary="summary"
    @gameSelected="handleGameCardClick(id)"
  />
</div>
</template>

<script>
import FieldSearch from '../containers/FieldSearch'
import RangeYear from '../containers/RangeYear'
import VDropdown from '../views/VDropdown'
import VGameCard from '../views/VGameCard'
import igdb from 'igdb'

export default {
  components: {
    FieldSearch,
    RangeYear,
    VDropdown,
    VGameCard,
  },
  data: _ => ({
    games: [],

    selectedGameId: NaN,

    startYear: '',

    endYear: '',

    searchTerm: '',

    orderBy: 'name:asc',

    filterTimeout: null,

    dropdownOptions: {
      gameTitle: 'Game title (A to Z)',
      releaseDate: 'Recently released',
    },
  }),
  props: {
    selectable: {
      type: Boolean,
      default: true,
    },
    idSelected: {
      type: Number,
    },
  },
  created() {
    this.fetchNewGamesList()
    this.idSelected
      ? (this.selectedGameId = this.idSelected)
      : (this.selectedGameId = NaN)
  },
  computed: {
    selectedGame() {
      let gameMatch
      if (this.selectedGameId) {
        gameMatch = this.games.filter(
          game => game.id === this.selectedGameId
        )[0]
      }
      return gameMatch ? gameMatch : {}
    },
  },
  methods: {
    handleGameCardClick() {
      if (this.selectable) {
        this.selectedGameId = arguments[0]
      }
    },
    searchTermChanged() {
      //filterGames(searchTerm);
    },

    fetchNewGamesList() {
      igdb
        .list(this.searchTerm, this.startYear, this.endYear, '*', this.orderBy)
        .then(result => {
          const x = result.map(element => igdb.get(element.id))
          this.games = []
          Promise.all(x).then(res => {
            res.forEach(game => {
              game.popularity = game.popularity
                ? +parseFloat(game.popularity).toFixed(2)
                : 0
              this.games.push(game)
            })
          })
        })
      // console.log('Fetching list...')
    },

    applyFilter() {
      clearTimeout(this.filterTimeout)
      this.filterTimeout = setTimeout(this.fetchNewGamesList, 500)
    },
    applyYearFilter() {
      this.startYear = arguments[0] ? arguments[0] + '-01-01' : ''
      this.endYear = arguments[1] ? arguments[1] + '-12-31' : ''
      this.applyFilter()
    },
    applySort() {
      let newSort = ''
      if (arguments[0] === 'gameTitle') {
        newSort = 'name:asc'
      } else if (arguments[0] === 'releaseDate') {
        newSort = 'release_dates.date:desc'
      }
      if (this.orderBy !== newSort) {
        this.orderBy = newSort
        this.applyFilter()
      }
    },
    applySearchTerm() {
      this.searchTerm = arguments[0]
      this.applyFilter()
    },
    // filterGames(searchTerm) {
    //   //filters the list of games
    // },
  },
  watch: {
    selectedGameId: function() {
      this.$emit('selectedGameChanged', this.selectedGameId, this.selectedGame)
    },
  },
}
</script>

<style lang="scss">
.filterBar {
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 36px;
}

.FieldSearch {
  width: 240px;
}

.RangeYear {
  width: 165px;
}

.VDropdown {
  margin-left: 16px;
  width: 192px;
}

.VGameCard:last-of-type {
  margin-bottom: 72px;
}
</style>
