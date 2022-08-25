import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routerFade } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerFade],
})
export class AppComponent {}
