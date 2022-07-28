import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" style="display: grid; place-content: center;">
      <div>Hello World!</div>
    </main>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'track-expenses-app-frontend';
}
