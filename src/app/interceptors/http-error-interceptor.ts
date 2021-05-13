import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((response: HttpErrorResponse) => {
          let errorMessage = "";
          if (response.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = "Error: ${response.error.message}";
          } else {
            // server-side error
            errorMessage = "Error Code: " + response.status + "\n" + "Error: " + response.error + "\n" + "Message: " + response.message;
          }
          //window.alert(errorMessage);
        console.log(response.error);
          return throwError(errorMessage);
        })
      )
  }

}
