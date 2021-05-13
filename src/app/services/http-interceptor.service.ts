import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private tokenExtractor: HttpXsrfTokenExtractor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.log(req);
    if (this.authenticationService.isUserLoggedIn()) {
      const httpReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json', Authorization: 'Bearer ' + sessionStorage.getItem("jwt")
        })

      });
      return next.handle(httpReq);
    } else {
      return next.handle(req);
    }     
  }

}



