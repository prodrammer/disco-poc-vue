import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.list = React.createRef();
    this.handleSelectedGameChanged = this.handleSelectedGameChanged.bind(this)
    this.selectedGame = undefined
  }

  componentDidMount() {
    this.list.current.addEventListener("selectedGameChanged", this.handleSelectedGameChanged);
  }

  componentWillUnmount() {
    this.list.current.removeEventListener("selectedGameChanged", this.handleSelectedGameChanged);
  }
  
  handleSelectedGameChanged(e) {
    this.selectedGame = e.detail[1]
    this.forceUpdate()
  }

  get selectedGameId() {
    return this.selectedGame && this.selectedGame.id
  }

  get selectedGameHypes() {
    return this.selectedGame && this.selectedGame.popularity
  }

  get selectedGameNumRatings() {
    return this.selectedGame && this.selectedGame.rating_count
  }

  get selectedGameRating() {
    return this.selectedGame && this.selectedGame.rating
  }

  get selectedGameReleaseDate() {
    return this.selectedGame && this.selectedGame.created_at
  }

  get selectedGameTitle() {
    return this.selectedGame && this.selectedGame.name
  }

  get imgUrl () {
    if (this.selectedGame) {
      if (this.selectedGame.cover) return this.selectedGame.cover.url
      if (this.selectedGame.screenshots) return this.selectedGame.screenshots[0].url
    }

    return undefined
  }

  render() {
    return (
      <div className="App">
        <header><h1>This is a header in react!</h1></header>
        <v-list ref={this.list} selectable={true}></v-list>
        <v-single-game
          id={this.selectedGameId}
          hypes={this.selectedGameHypes}
          numRatings={this.selectedGameNumRatings}
          rating={this.selectedGameRating}
          releaseDate={this.selectedGameReleaseDate}
          title={this.selectedGameTitle}
          imgUrl={this.selectedGameImgUrl}
        ></v-single-game>
        <footer>This is a footer in react!</footer>
      </div>
    );
  }
}

export default App;
