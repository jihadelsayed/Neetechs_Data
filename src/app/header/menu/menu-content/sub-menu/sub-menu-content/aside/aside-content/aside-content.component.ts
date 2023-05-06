import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { MenuService } from 'src/app/header/menu/menu.service';
import { StyleModeService } from 'src/app/header/style-mode.service';

@Component({
  selector: 'app-aside-content',
  templateUrl: './aside-content.component.html',
  styleUrls: ['./aside-content.component.scss']
})
export class AsideContentComponent implements OnInit {
  currentRoute:any
  currentLang = this.localeId || 'en'; // or 'ar'
  aside: any[];
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
              this.getAside()
           });
  }
  ngOnInit() {
    let menuURL = window.location.hash.split("/")[1]
    let subMenuURL = window.location.hash.split("/")[2]
    let asideURL = window.location.hash.split("/")[3]
    this.menuService.getAside(menuURL, subMenuURL, asideURL).subscribe(
      (data: any) => {
        console.log(data.data)
        this.aside = data.data
        this.introduction = data.introduction
      })
  }
  getAside(){
    let menuURL = window.location.hash.split("/")[1]
    let subMenuURL = window.location.hash.split("/")[2]
    let asideURL = window.location.hash.split("/")[3]
    this.menuService.getAside(menuURL, subMenuURL, asideURL).subscribe(
      (data: any) => {
        console.log(data.data)
        this.aside = data.data
        this.introduction = data.introduction
      })
  }
}
