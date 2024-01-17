import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const _snackBar = inject(MatSnackBar);
  const isLoggedIn: boolean = authService.getIsLoggedIn();
  if (!isLoggedIn) {
    _snackBar.open('Для доступа необходимо авторизоваться');
  }
  return isLoggedIn;
};
