import { NgModule } from '@angular/core';
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
import { PagesHomePageComponent } from './pages/common/pages-home-page/pages-home-page.component';
import { PagesNotFoundPageComponent } from './pages/common/pages-not-found-page/pages-not-found-page.component';

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
})
export class AppModule {}
