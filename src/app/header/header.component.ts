import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuShow = false;
  userExist = false;

  ngOnInit(): void {
    this.userExist = Boolean(localStorage.getItem('userToken'));
  }

  toggleNavbar(): void {
    this.menuShow = !this.menuShow;
  }

  closeNavbar(): void {
    this.menuShow = false;
  }
}
