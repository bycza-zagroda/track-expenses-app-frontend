import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesHomePageComponent } from '../pages/common/pages-home-page/pages-home-page.component';

const routes: Routes = [
  { path: '', component: PagesHomePageComponent },
  {
    path: 'wallets',
    loadChildren: () => import('../pages/wallets/pages-wallets.module').then(m => m.PagesWalletsModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class RoutesModule {}
