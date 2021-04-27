import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
  
    if (this.authenticationService.isUserLoggedIn()) {
      const httpReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json', Authorization: 'Basic ' + this.authenticationService.token
        })
      });
      return next.handle(httpReq);
    } else {
      return next.handle(req);
    }  
    
  }
}
