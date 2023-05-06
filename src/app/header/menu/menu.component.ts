import { Component, OnInit, Inject } from '@angular/core';
import { menu } from 'src/environments/menu';
import menuTranslations from 'src/locale/menu.json';

import { LOCALE_ID } from '@angular/core';
import { StyleModeService } from '../style-mode.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  currentLang = this.localeId || 'en'; // or 'ar'
  menu = menu;
  menuTranslations: any = menuTranslations;
  currentRoute: any

  constructor(@Inject(LOCALE_ID) public localeId: string,
    public styleModeService: StyleModeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(
      event => {
        //this.router.url.split('/')[1]
        this.currentRoute = event.url.split('/')[1];
        console.log(event);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentRoute;
    });
    // const urlSegments = this.route.snapshot.url;
    // if (urlSegments.length > 0) {
    //   this.currentUrl = urlSegments[0].path;
    // } else {
    //   this.currentUrl = '';
    // }

  }
}
