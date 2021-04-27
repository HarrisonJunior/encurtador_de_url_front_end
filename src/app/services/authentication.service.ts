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
  id: number | undefined;
  username: string | undefined;
  token: string | undefined; //username+passoword criptografados

  constructor(private httpClient: HttpClient, private router : Router) { }

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<any>(this.url, { headers }).pipe(map((response) => {
      if (response != undefined) {
        this.id = response["principal"]["id"];
        this.username = response["principal"]["username"];
        this.token = btoa(username + ':' + password);
      }
    }));
  }

  isUserLoggedIn() {
    let username = this.username;
    return !(this.username === undefined);
  }

  logout() {
    this.id = undefined;
    this.username = undefined;
    this.token = undefined;
    this.router.navigate(["login"]);
  }

}

