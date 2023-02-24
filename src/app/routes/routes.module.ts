import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesHomePageComponent } from '../pages/home/pages-home-page.component';
import { PagesNotFoundPageComponent } from '../pages/not-found/pages-not-found-page.component';

const routes: Routes = [
  { path: '', component: PagesHomePageComponent },
  {
    path: 'wallets',
    loadChildren: () => import('../pages/wallets/pages-wallets.module').then(m => m.PagesWalletsModule),
  },
  { path: '**', component: PagesNotFoundPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class RoutesModule {}
