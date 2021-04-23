import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { retry, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = 'http://localhost:8080/login';
  user = {} as User;

  constructor(private httpClient: HttpClient, private router : Router) { }

  authenticate(user: User): Observable<User> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' +  btoa(user.username + ':' + user.password)});
    return this.httpClient.get<User>(this.url, { headers }).pipe(
      map(userData => {
        this.user.username = userData.username;
        this.user.id = userData.id;
        sessionStorage.setItem('username', user.username);
        return userData;
      })
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.router.navigate(["login"]);
  }

  getUserId(): Observable<string>{
    return this.httpClient.get<string>("http://localhost:8080/user" + "/" + sessionStorage.getItem("username")).pipe(
      map(id => {
        return id;
      })
    );
  }

}

