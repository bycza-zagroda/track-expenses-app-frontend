import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoute, ROUTES } from 'src/app/routing/app-routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  routes: AppRoute[];

  constructor() {
    this.routes = ROUTES;
  }
}
