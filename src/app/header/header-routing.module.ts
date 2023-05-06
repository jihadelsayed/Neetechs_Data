import { Routes } from '@angular/router';
import { MenuContentComponent } from './menu/menu-content/menu-content.component';
import { SubMenuContentComponent } from './menu/menu-content/sub-menu/sub-menu-content/sub-menu-content.component';
import { AsideContentComponent } from './menu/menu-content/sub-menu/sub-menu-content/aside/aside-content/aside-content.component';

export const headerRoutes: Routes = [
  {
    path: ':menuURL', component: MenuContentComponent,
    children: [
      {
        path: ':subMenuURL', component: SubMenuContentComponent,
        children: [
          { path: ':asideBarURL', component: AsideContentComponent },
        ]
      }
    ]
  },
];
