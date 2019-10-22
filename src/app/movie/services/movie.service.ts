import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IMovie } from '../movie';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private movieUrl = 'api/movies.json';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.movieUrl)
    .pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  getMovie(objectId: string): Observable<IMovie | undefined> {
    return this.getMovies()
    .pipe(
      map((movies: IMovie[]) => movies.find(movie => movie.objectId === objectId)),
      catchError(this.handleError)
    );
  }

  getFavMovie(objectId: string): Observable<any> {
    return this.getMovies()
    .pipe(
      map((movies: any) => movies.find(movie => movie.objectId === objectId)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Sorry, An Error Occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server Returned Code: ${err.status}, Error Message Is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
