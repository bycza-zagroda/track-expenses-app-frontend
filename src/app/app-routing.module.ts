import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Track Expenses - Home',
    component: HomeComponent,
  },
  {
    path: 'wallet',
    title: 'Track Expenses - Wallet',
    data: {
      label: 'wallet',
    },
    loadChildren: () =>
      import('./modules/wallet/wallet.module').then((m) => m.WalletModule),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
