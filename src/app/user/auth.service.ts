import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  url = 'https://safe-crag-24653.herokuapp.com/user';
  signinUrl = 'https://safe-crag-24653.herokuapp.com/user/signin';

  constructor(private http: HttpClient, private router: Router) { }

  addUser(userData:IUser): Observable<any>  {
    return this.http.post(this.url, userData);
  }

  getUser(user_data): Observable<any>  {
    return this.http.post<any>(this.signinUrl, user_data)
    .pipe (
      map(result => {
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('name', result.name);
        localStorage.setItem('token', result.token);
        return true;
      })
    );
  }

  public logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}

