import { Component, Inject, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../authorization/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
  readonly userInfo = this.readUserInfo();
  readonly accountUrl = environment.LoginURL.replace('accounts.', 'myaccount.');

  constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

  get displayName(): string {
    return this.userInfo?.first_name
      || this.userInfo?.username
      || this.userInfo?.email
      || $localize`Neetechs user`;
  }

  get email(): string {
    return this.userInfo?.email || $localize`Signed in`;
  }

  get initials(): string {
    const parts = this.displayName.trim().split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'N';
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('UserInfo');

    const language = this.localeId.split('-')[0] || 'en';
    const parameters = new URLSearchParams({
      host: window.location.host,
      language,
      pathname: window.location.pathname,
    });

    window.location.href = `${environment.LoginURL}${language}/#/signOut?${parameters.toString()}`;
  }

  private readUserInfo(): Partial<UserInfo> | null {
    const stored = localStorage.getItem('UserInfo');

    if (!stored) {
      return null;
    }

    try {
      const value: unknown = JSON.parse(stored);
      return typeof value === 'object' && value !== null ? value as Partial<UserInfo> : null;
    } catch {
      return null;
    }
  }
}
