import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    }

    void this.router.navigate(['/signin']);
    return false;
  }
}
