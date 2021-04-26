import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { retry, catchError, map } from 'rxjs/operators';
import { Url } from '../models/url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = environment.BASE_URL + '/urls';

  constructor(private httpClient: HttpClient) { }

  //Headers da autorização
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  }

  //Busca todas as urls do usuário
  getAllUrlsByUsername(): Observable<Url[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + sessionStorage.getItem("username") + ':' + sessionStorage.getItem("password"), "Access-Control-Allow-Origin":"*" });
    return this.httpClient.get<Url[]>(this.url + '/' + sessionStorage.getItem("username"), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //Salva url
  saveUrl(url: Url): Observable<User> {
    return this.httpClient.post<User>(this.url, JSON.stringify(url), this.httpOptions);
  }

  //Deleta uma url pelo seu id
  deletarUrl(url: Url) {
    return this.httpClient.delete(this.url + "/" + url.id, this.httpOptions)
      .pipe(
         retry(1),
          catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}


