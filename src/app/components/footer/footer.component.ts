import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AppRoute, ROUTES} from "../../routing/app-routes";

// @ts-ignore
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class FooterComponent {
  routes: AppRoute[];

  date = new Date();
  year = [this.date.getFullYear()]


  constructor() {
    this.routes = ROUTES;

  }


}
