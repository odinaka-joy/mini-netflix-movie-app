import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { FavouriteMoviesService } from '../services/favourite-movies.service';
import { IMovie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class FavouriteMovieResolver implements Resolve<any> {
  errorMessage = '';
  localMovies=[];
  movies=[];

  constructor(private movieService: MovieService, private favouriteMoviesService: FavouriteMoviesService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    const userId = localStorage.getItem('userId');

    return this.favouriteMoviesService.getFavMovies(userId)
    .pipe(
      map(movies => {
        this.movies = movies;
          for (let movie of this.movies) {
            this.getLocalMovie(movie.movieId)
          }
      }),
      catchError(error => {
        this.errorMessage = `Retrieval error: ${error}`;
        return of({ movies: null, error: this.errorMessage });
      })
    );
  }
  getLocalMovie(objectId):void {
    this.movieService.getFavMovie(objectId).subscribe({
      next: movies => {
        this.localMovies.push(movies);
      },
      error: err => this.errorMessage = err
    });
  }
}
