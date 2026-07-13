import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface NavigationItem {
  name: string;
  routerLink: string;
}

export interface NavigationIntroduction {
  name?: string;
  example?: string;
  description?: string;
}

export interface NavigationResponse {
  data: NavigationItem[];
  introduction?: NavigationIntroduction;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly currentLang: string;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    private readonly httpClient: HttpClient,
  ) {
    this.currentLang = localeId.split('-')[0] || 'en';
  }

  getMenu(menuUrl: string): Observable<NavigationResponse> {
    return this.getNavigation([menuUrl], menuUrl);
  }

  getSubMenu(menuUrl: string, subMenuUrl: string): Observable<NavigationResponse> {
    return this.getNavigation([menuUrl, subMenuUrl], subMenuUrl);
  }

  getAside(menuUrl: string, subMenuUrl: string, asideUrl: string): Observable<NavigationResponse> {
    return this.getNavigation([menuUrl, subMenuUrl, asideUrl], asideUrl);
  }

  getSubAside(
    menuUrl: string,
    subMenuUrl: string,
    asideUrl: string,
    subAsideUrl: string,
  ): Observable<NavigationResponse> {
    return this.getNavigation([menuUrl, subMenuUrl, asideUrl, subAsideUrl], subAsideUrl);
  }

  private getNavigation(path: string[], fileName: string): Observable<NavigationResponse> {
    const safePath = path.map(segment => encodeURIComponent(segment)).join('/');
    const safeFileName = encodeURIComponent(fileName);
    const url = `${environment.JSON_URL}${safePath}/${safeFileName}.${this.currentLang}.json`;
    return this.httpClient.get<NavigationResponse>(url);
  }
}
