import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(@Inject(LOCALE_ID) public localeId: string, private httpClient: HttpClient) { }
  currentLang = this.localeId || 'en'; // or 'ar'
  getMenus() {
    return this.httpClient.get(
      environment.JSON_URL
    +environment.JSON_URL.substring(environment.JSON_URL.lastIndexOf('/') + 1)
    +'.'+
    +this.currentLang+'.json');
  }
  getMenu(menuURL) {
    return this.httpClient.get(environment.JSON_URL+menuURL+ '/'+ menuURL+'.'+this.currentLang+'.json');
  }
  getSubMenu(menuURL, subMenuURL) {
    return this.httpClient.get(environment.JSON_URL+menuURL+ '/'+ subMenuURL + '/'+ subMenuURL+'.'+this.currentLang+'.json');
  }
  getAside(menuURL, subMenuURL, asideBarURL) {
    return this.httpClient.get(environment.JSON_URL+menuURL+ '/'+ subMenuURL + '/'+ asideBarURL+ '/'+ asideBarURL+'.'+this.currentLang+'.json');
  }
  getSubAside(menuURL, subMenuURL, asideBarURL, subAsideBarURL) {
    return this.httpClient.get(environment.JSON_URL+menuURL+ '/'+ subMenuURL+'/'+ asideBarURL+'/'+ subAsideBarURL + '/'+ subAsideBarURL+'.'+this.currentLang+'.json');
  }
}

