import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-angular';
  selectedGame = undefined;

  selectedGameChanged(e) {
    this.selectedGame = e.detail[1]
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

  get selectedGameImgUrl () {
    if (this.selectedGame) {
      if (this.selectedGame.cover) return this.selectedGame.cover.url
      if (this.selectedGame.screenshots) return this.selectedGame.screenshots[0].url
    }

    return undefined
  }
}
