import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { tokenExpiredInterceptor } from './app/common/auth/token-expired.interceptor';

import 'chart.js';
import { accessTokenInterceptor } from './app/common/auth/access-token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([accessTokenInterceptor, tokenExpiredInterceptor]),
    ),
    ConfirmationService,
    MessageService,
    DialogService,
  ],
}).catch((err) => console.error(err));
