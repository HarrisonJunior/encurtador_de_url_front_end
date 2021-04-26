import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { retry, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.BASE_URL + "/login";  //endpoint
  user = {} as User;

  constructor(private httpClient: HttpClient, private router : Router) { }

  authenticate(user: User): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.username + ':' + user.password),"Content-Type":"application/json"});
    return this.httpClient.get<any>(this.url, { headers });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logout() {
    console.log(environment.BASE_URL + "/logout");
    this.httpClient.get(environment.BASE_URL + "/logout");
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

}

