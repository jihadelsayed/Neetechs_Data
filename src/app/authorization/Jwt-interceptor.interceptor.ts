import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('userToken');
    const authenticatedRequest = token && request.url.startsWith(environment.SERVER_URL)
      ? request.clone({ setHeaders: { Authorization: `Token ${token}` } })
      : request;

    return next.handle(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('UserInfo');
          this.redirectToAccount();
        }

        return throwError(() => error);
      }),
    );
  }

  private redirectToAccount(): void {
    const language = this.localeId.split('-')[0] || 'en';
    const parameters = new URLSearchParams({
      host: window.location.host,
      language,
      pathname: window.location.pathname,
    });
    window.location.replace(`${environment.LoginURL}${language}/#/signIn?${parameters.toString()}`);
  }
}
