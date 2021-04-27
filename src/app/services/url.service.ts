import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { retry, catchError, map } from 'rxjs/operators';
import { Url } from '../models/url';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = environment.BASE_URL + '/urls'; // endpoint api rest

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  //Busca todas as urls do usuário
  getAllUrlsByUsername(): Observable<Url[]>{
    return this.httpClient.get<Url[]>(this.url + '/' + this.authenticationService.username);
  }

  //Salva url
  saveUrl(url: Url): Observable<User> {
    url.user.id = this.authenticationService.id;
    return this.httpClient.post<User>(this.url, JSON.stringify(url));
  }

  //Deleta uma url pelo seu id
  deletarUrl(url: Url) {
    return this.httpClient.delete(this.url + "/" + url.id);
  }

  atualizarUrl(url: Url) {
    return this.httpClient.put<User>(this.url, JSON.stringify(url));
  }

}


