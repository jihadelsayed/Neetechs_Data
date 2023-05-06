import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { StyleModeService } from 'src/app/header/style-mode.service';

@Component({
  selector: 'app-user-notifications-menu',
  templateUrl: './user-notifications-menu.component.html',
  styleUrls: ['./user-notifications-menu.component.css']
})
export class UserNotificationsMenuComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) public localeId: string, public styleModeService: StyleModeService) { }

  ngOnInit(): void {
  }

}
