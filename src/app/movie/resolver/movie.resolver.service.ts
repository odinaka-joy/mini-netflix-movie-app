import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
  errorMessage = '';

  constructor(private movieService: MovieService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    const objectId = route.paramMap.get('objectId');

    return this.movieService.getMovie(objectId)
      .pipe(
        map(movie => ({ movie })),
        catchError(error => {
          this.errorMessage = `Retrieval error: ${error}`;
          return of({ movie: null, error: this.errorMessage });
        })
      );
  }

}
