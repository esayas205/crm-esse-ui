// jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auth/services/auth-store.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);

  // Don't attach token for login endpoint
  if (req.url.includes('/api/auth/login')) {
    return next(req);
  }

  const token = store.token;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
