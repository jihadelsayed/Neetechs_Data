import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

interface CredentialMessage {
  type: 'credential';
  getToken: string;
  getUserInfo: unknown;
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  @ViewChild('accountFrame', { static: true })
  private readonly accountFrame!: ElementRef<HTMLIFrameElement>;

  readonly frameSrc: SafeResourceUrl;
  private readonly accountOrigin = new URL(environment.LoginURL).origin;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    sanitizer: DomSanitizer,
  ) {
    const language = localeId.split('-')[0] || 'en';
    const parameters = new URLSearchParams({
      host: window.location.href,
      language,
      pathname: window.location.pathname,
    });
    const source = `${environment.LoginURL}${language}/#/getCredential?${parameters.toString()}`;
    this.frameSrc = sanitizer.bypassSecurityTrustResourceUrl(source);
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userToken')) {
      window.addEventListener('message', this.handleCredential);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleCredential);
  }

  private readonly handleCredential = (event: MessageEvent<unknown>): void => {
    if (
      localStorage.getItem('userToken')
      || event.origin !== this.accountOrigin
      || event.source !== this.accountFrame.nativeElement.contentWindow
      || !this.isCredentialMessage(event.data)
    ) {
      return;
    }

    localStorage.setItem('userToken', event.data.getToken);
    localStorage.setItem(
      'UserInfo',
      typeof event.data.getUserInfo === 'string'
        ? event.data.getUserInfo
        : JSON.stringify(event.data.getUserInfo),
    );
    window.removeEventListener('message', this.handleCredential);
  };

  private isCredentialMessage(value: unknown): value is CredentialMessage {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const message = value as Partial<CredentialMessage>;
    return message.type === 'credential'
      && typeof message.getToken === 'string'
      && message.getToken.length > 0
      && message.getToken !== 'undefined';
  }
}
