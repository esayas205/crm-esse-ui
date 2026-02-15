import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import {authErrorInterceptor} from './core/interceptors/auth-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, jwtInterceptor, authErrorInterceptor])),
  ]
};
