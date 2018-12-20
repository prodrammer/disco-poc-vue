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
    if (this.selectedGame && this.selectedGame.created_at) {
      const date = new Date(this.selectedGame.created_at)
      const month = date.toLocaleDateString('en-us', { month: 'long' })
      const year = date.getFullYear()
      return `${month} ${year}`
    }
    return undefined
  }

  get selectedGameTitle() {
    return this.selectedGame && this.selectedGame.name
  }

  get selectedGameImgUrl () {
    if (this.selectedGame) {
      if (this.selectedGame.cover) return this.selectedGame.cover.url
      if (this.selectedGame.screenshots) return this.selectedGame.screenshots[0].url
    }

    return undefined
  }

  render() {
    return (
      <div className="demo-container">
        <div className="demo-container__main">
          <disco-list ref={this.list} selectable={true}></disco-list>
        </div>
        <div className="demo-container__sidebar">
          <disco-single-game
            id={this.selectedGameId}
            hypes={this.selectedGameHypes}
            num-ratings={this.selectedGameNumRatings}
            rating={this.selectedGameRating}
            release-date={this.selectedGameReleaseDate}
            title={this.selectedGameTitle}
            img-url={this.selectedGameImgUrl}></disco-single-game>
        </div>
      </div>
    );
  }
}

export default App;
