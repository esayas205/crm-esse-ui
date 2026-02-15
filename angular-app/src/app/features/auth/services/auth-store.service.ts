// auth-store.service.ts
import { Injectable } from '@angular/core';

export type AuthUser = { username: string; authorities: string[] };

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private TOKEN_KEY = 'jwt_token';
  private USER_KEY = 'jwt_user';

  get token(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY); // prefer sessionStorage over localStorage
  }

  get user(): AuthUser | null {
    const raw = sessionStorage.getItem(this.USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  setAuth(token: string, user: AuthUser) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clear() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    const u = this.user;
    return !!u?.authorities?.includes(role);
  }
}
