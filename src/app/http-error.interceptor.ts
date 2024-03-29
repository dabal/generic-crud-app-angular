import {

    HttpEvent,
   
    HttpInterceptor,
   
    HttpHandler,
   
    HttpRequest,
   
    HttpResponse,
   
    HttpErrorResponse
   
   } from '@angular/common/http';
   
   import { Observable, throwError } from 'rxjs';
   
   import { retry, catchError } from 'rxjs/operators';
   import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
   
   
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      return next.handle(request)
   
        .pipe(
   
          catchError((error: HttpErrorResponse) => {
   
            let errorMessage = '';
   
            if (error.error instanceof ErrorEvent) {
   
              // client-side error
   
              errorMessage = `Error: ${error.error.message}`;
   
            } else {
   
              // server-side error
   
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   
            }
   
            this.router.navigate(['/error']);
   
            return throwError(errorMessage);
   
          })
   
        )
   
    }
   
   }