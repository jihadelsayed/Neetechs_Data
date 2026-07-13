import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptorInterceptor implements HttpInterceptor {
  currentLocale: string;

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.currentLocale = this.locale.split('-', 1)[0];
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.set('accept-language', this.currentLocale),
    });
    return next.handle(clonedRequest);
  }
}
