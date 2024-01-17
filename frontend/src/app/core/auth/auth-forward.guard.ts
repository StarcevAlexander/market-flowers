// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { Location } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthForwardGuard implements CanActivate {

//   constructor(private authService: AuthService, private location: Location) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     if (this.authService.getIsLoggedIn()) {
//       this.location.back();
//       return false;
//     }
//     return true;
//   }
// }

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authForwardGuard = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getIsLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
