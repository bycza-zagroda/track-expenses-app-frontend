import { Route } from "@angular/router";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";

export const ROUTES: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'wallets',
    loadChildren: () => import('./pages/wallets/wallets.routes').then(m => m.WALLETS_ROUTES),
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
