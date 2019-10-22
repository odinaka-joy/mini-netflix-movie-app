import { Component, OnInit } from '@angular/core';
import { IMovie } from '../movie';
import { MovieService } from '../services/movie.service';
import { FavouriteMoviesService } from '../services/favourite-movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle:string ="Latest Movies and More...";
  errorMessage = '';
  userId = localStorage.getItem('userId');
  obj = [];

  filteredMovies: IMovie[] = [];
  movies: IMovie[] = [];
  _movieFilter:string;
  get movieFilter(): string {
    return this._movieFilter;
  }
  set movieFilter(value: string) {
    this._movieFilter = value;
    this.filteredMovies = this.movieFilter ? this.performFilter(this.movieFilter) : this.movies;
  }

  // These are settings for pagination
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  config = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: this.filteredMovies.length
  };

  constructor(private movieService: MovieService, private favouriteMoviesService: FavouriteMoviesService) {
    this.filteredMovies = this.movies;
    this.movieFilter = '';
  }
 // These is settings for pagination
  onPageChange(event:any) {
    this.config.currentPage = event;
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
      movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit():void {
    this.movieService.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        this.filteredMovies = movies;
      },
      error: err => this.errorMessage = err
    });

    this.favouriteMoviesService.getFavMovies(this.userId).subscribe(res => {
      this.obj = res;
    }, err => {
      err: err => this.errorMessage = err
    });
  }

  sortAsc():IMovie[] {
    this.filteredMovies.sort((a,b) => a.title < b.title ? -1 : 1);
    return this.filteredMovies;
  }

  sortDesc():IMovie[] {
    this.filteredMovies.sort((a,b) => a.title > b.title ? -1 : 1);
    return this.filteredMovies;
  }
}
