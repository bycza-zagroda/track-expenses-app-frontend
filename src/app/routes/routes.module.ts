import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesHomePageComponent } from '../pages/common/pages-home-page/pages-home-page.component';
import { PagesNotFoundPageComponent } from '../pages/common/pages-not-found-page/pages-not-found-page.component';

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
