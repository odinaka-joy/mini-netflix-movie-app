import { Component, OnInit } from '@angular/core';
import { FavouriteMoviesService } from '../services/favourite-movies.service';
import { IMovie } from '../movie';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.css']
})
export class FavouriteMoviesComponent implements OnInit {
  errorMessage = '';
  deleteMessage = '';
  movies:any[] = [];
  localMovies:any[] = [];
  userId = localStorage.getItem('userId');

// These are settings for pagination
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<',
      nextLabel: '>',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  config = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: this.movies.length
  };

  constructor(private favouriteMoviesService: FavouriteMoviesService,
            private movieService: MovieService, private router: Router) {
  }
// These is settings for pagination
  onPageChange(event:any) {
    this.config.currentPage = event;
  }

  ngOnInit():void {
    this.favouriteMoviesService.getFavMovies(this.userId).subscribe(res => {
      this.movies = res;
      for (let movie of this.movies) {
        this.getLocalMovie(movie.movieId)
      }
    }, err => {
      err: err => this.errorMessage = err
    });
  }

  getLocalMovie(objectId):void {
    this.movieService.getFavMovie(objectId).subscribe({
      next: movies => {
        this.localMovies.push(movies);
      },
      error: err => this.errorMessage = err
    });
  }

  removeFavourite(event):void {
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let value = idAttr.nodeValue;
    this.favouriteMoviesService.deleteFavMovies(value, this.userId).subscribe({
      next: movies => {
        alert('Successfully Deleted');
        this.localMovies = movies;
      },
      error: err => this.errorMessage = err
    });
  }
}
