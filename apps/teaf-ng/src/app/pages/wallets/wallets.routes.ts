import { Route } from '@angular/router';

export const WALLETS_ROUTES: Route[] = [
  {
    path: ':id',
    loadComponent: () => import('./wallet-details/wallet-details.component').then(m => m.WalletDetailsComponent),
  },
  {
    path: '',
    loadComponent: () => import('./wallets-overview/wallets-overview.component').then(m => m.WalletsOverviewComponent),
  },
];
