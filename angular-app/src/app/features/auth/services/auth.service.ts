// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { AuthStore } from './auth-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private store: AuthStore) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/auth/login`, payload).pipe(
      tap((res) => {
        this.store.setAuth(res.token, {
          username: res.username,
          authorities: res.authorities,
        });
      })
    );
  }

  logout() {
    this.store.clear();
  }
}
