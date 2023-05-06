import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StyleModeService } from 'src/app/header/style-mode.service';
import { MenuService } from 'src/app/header/menu/menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  currentRoute:any
  currentLang = this.localeId || 'en'; // or 'ar'
  subMenu: any[];
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
              this.currentRoute = event.url.split('/')[3];
              console.log(event);
              this.getSubMenu()
           });
  }
  getSubMenu(){
    let menuURL = window.location.hash.split("/")[1]
    let subMenuURL = window.location.hash.split("/")[2]
    this.menuService.getSubMenu(menuURL, subMenuURL).subscribe(
      (data: any) => {
        console.log(data.data)
        this.subMenu = data.data
        this.introduction = data.introduction
      })
  }
  ngOnInit(): void {

   // this.getMenu()
  }
}
