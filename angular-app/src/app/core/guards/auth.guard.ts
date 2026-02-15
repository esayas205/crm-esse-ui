// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthStore } from '../../features/auth/services/auth-store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: AuthStore, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.store.isLoggedIn() ? true : this.router.parseUrl('/sign-in');
  }
}
