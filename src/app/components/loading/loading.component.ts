import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    <div class='grid place-items-center'>
      <span class="loading loading-ring loading-lg"></span>
    </div>
  `,
  styles: ``
})
export class LoadingComponent {

}
