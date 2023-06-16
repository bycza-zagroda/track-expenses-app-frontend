import { Route } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { loggedInUserGuard } from './common/auth/logged-in-user.guard';

export const ROUTES: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'wallets',
    loadChildren: () => import('./pages/wallets/wallets.routes').then(m => m.WALLETS_ROUTES),
    canActivate: [ loggedInUserGuard ],
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
    canActivate: [ loggedInUserGuard ],
  },
  { path: '**', component: NotFoundComponent },
];
