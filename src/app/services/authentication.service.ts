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
  url = environment.BASE_URL + "/login"; //endpoint api rest

  constructor(private httpClient: HttpClient, private router : Router) { }

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<any>(this.url, JSON.stringify({ 'username': username, 'password': password }), { headers }).pipe(map((response) => {
      if (response != undefined) {
        //console.log(response["jwt"])
        //console.log(response["userId"])
        sessionStorage.setItem("jwt", response["jwt"]);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userId", response["userId"]);
      }
    }));
  }

  isUserLoggedIn():boolean {
    return !(sessionStorage.getItem("username") === null);
  }

  logout() {
    //console.log(sessionStorage.getItem("jwt"));
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

}

