import { Component, Inject, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
})
export class LoginMenuComponent {
  constructor(@Inject(LOCALE_ID) public readonly localeId: string) {}

  get loginUrl(): string {
    return this.accountUrl('signIn');
  }

  get signUpUrl(): string {
    return this.accountUrl('signUp');
  }

  private accountUrl(route: 'signIn' | 'signUp'): string {
    const language = this.localeId.split('-')[0] || 'en';
    const parameters = new URLSearchParams({
      host: window.location.host,
      language,
      pathname: window.location.pathname,
    });

    return `${environment.LoginURL}${language}/#/${route}?${parameters.toString()}`;
  }
}
