import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { ROUTES } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';

import 'chart.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    ConfirmationService,
    MessageService,
    DialogService,
  ],
}).catch((err) => console.error(err));
