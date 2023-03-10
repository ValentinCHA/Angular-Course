import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content"> <h1>Welcome to {{title}}! </h1>  `,
  styles: []
})
export class AppComponent {
  title = 'ng-pokemon-app';
}
