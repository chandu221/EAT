import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './login/interceptor/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
