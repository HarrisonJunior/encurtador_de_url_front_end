import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class XhrInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authenticationService.isUserLoggedIn()) {
      const xhr = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(sessionStorage.getItem("username") + ':' + sessionStorage.getItem("password")),
        })
      });
      return next.handle(xhr);
    } else {
      return next.handle(req);
    }  
    
  }
}
