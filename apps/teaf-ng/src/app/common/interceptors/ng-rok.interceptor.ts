import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * deprecated code, use functional approach instead
 */
@Injectable()
export class NgRokInterceptorOldTechnique implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(
      httpRequest.clone({
        setHeaders: { 'ngrok-skip-browser-warning': 'hello' },
        withCredentials: true,
      }),
    );
  }
}
