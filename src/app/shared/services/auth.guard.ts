import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const username = sessionStorage.getItem('username');
    if (username) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
