import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  // Prefix requests with apiBaseUrl if they start with /api
  let apiReq = req;
  if (req.url.startsWith('/api')) {
    apiReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`
    });
  }

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error?.message || `Error: ${error.status} - ${error.statusText}`;
      }

      toastService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
