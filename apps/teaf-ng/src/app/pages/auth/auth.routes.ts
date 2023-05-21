import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: 'sign-on',
    loadComponent: () => import('./sign-on/sign-on.component').then(m => m.SignOnComponent),
  },
];
