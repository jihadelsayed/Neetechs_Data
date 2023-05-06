import { filter } from 'rxjs/operators';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StyleModeService } from 'src/app/header/style-mode.service';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  currentRoute:any
  currentLang = this.localeId || 'en'; // or 'ar'
  menu: any[];
  introduction: any;

  constructor(@Inject(LOCALE_ID) public localeId: string,
  public styleModeService: StyleModeService,
  public menuService: MenuService,
  private router: Router)
  {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
      ).subscribe(
          event =>
           {
            //this.router.url.split('/')[1]
              this.currentRoute = event.url.split('/')[2];
              console.log(event);
              this.getMenu()
           });
  }
  getMenu(){
    let menuURL = window.location.hash.split("/")[1]
    this.menuService.getMenu(menuURL).subscribe(
      (data: any) => {
        console.log(data.data)

        this.menu = data.data
        this.introduction = data.introduction
      })
  }
  ngOnInit(): void {

   // this.getMenu()
  }
}
