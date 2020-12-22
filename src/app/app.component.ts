import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ui-notificator></ui-notificator>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'scalio-test';
}
