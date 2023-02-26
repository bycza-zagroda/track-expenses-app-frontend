import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';
import { CommonComponentsModule } from './common/components/common-components.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesHomePageComponent } from './pages/home/pages-home-page.component';
import { PagesNotFoundPageComponent } from './pages/not-found/pages-not-found-page.component';
import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';
import { DomainsTransactionCategoriesGateway } from './domains/categories/domains.transaction-categories.gateway';

export function appConfigFactory(appInitService: PagesTransactionCategoriesService) { console.log(0)
  return (): void => appInitService.loadCategories();
}

@NgModule({
  declarations: [ AppComponent, PagesHomePageComponent, PagesNotFoundPageComponent ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    RoutesModule,
    HttpClientModule,
    CommonComponentsModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => appConfigFactory,
    deps: [PagesTransactionCategoriesService],
    multi: true,
   }],
})
export class AppModule {}
