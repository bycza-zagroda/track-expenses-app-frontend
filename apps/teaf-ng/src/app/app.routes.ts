import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: 'wallets',
    loadChildren: () => import('./pages/wallets/wallets.routes').then(m => m.WALLETS_ROUTES),
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
  },
];
