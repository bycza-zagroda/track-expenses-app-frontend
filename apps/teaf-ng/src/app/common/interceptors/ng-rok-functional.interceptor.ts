import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const ngRokFunctionalInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  req = req.clone({
    setHeaders: { 'ngrok-skip-browser-warning': 'hello' },
    withCredentials: true,
  });
  return next(req);
};
