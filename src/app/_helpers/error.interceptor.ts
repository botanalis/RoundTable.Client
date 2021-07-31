import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "../_services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError(
        err => {
          if ([401, 403].includes(err.status) && this.authenticationService.optUser) {
            this.authenticationService.logout();
          }
          const error = err.error?.message || err.statusText;
          console.log(err);
          return throwError(error);
        }
      ));
  }
}
