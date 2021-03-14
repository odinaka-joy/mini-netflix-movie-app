import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteMoviesService {

  userId = localStorage.getItem('userId');
  token = localStorage.getItem('token');

  favMovieUrl = 'https://mini-netflix-by-joy.herokuapp.com/movie';

  constructor(private http: HttpClient) { }

  addFavMovies(data): Observable<any[]> {
    let access_token = this.token;
    let headers = new HttpHeaders().set('Authorization', `${access_token}`);
    return this.http.post<any[]>(this.favMovieUrl, data, { headers: headers })
  }

  getFavMovies(userId): Observable<any> {
    let access_token = this.token;
    let headers = new HttpHeaders().set('Authorization', `${access_token}`);
    return this.http.get<any>(`${this.favMovieUrl}/${userId}`, { headers: headers })
    .pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  deleteFavMovies(movieId, userId): Observable<any[]> {
    let access_token = this.token;
    let headers = new HttpHeaders().set('Authorization', `${access_token}`);
    return this.http.delete<any[]>(`${this.favMovieUrl}/${movieId}/${userId}`, { headers: headers })
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
