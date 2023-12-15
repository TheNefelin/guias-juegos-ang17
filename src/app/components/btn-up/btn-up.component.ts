import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-up',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <button
      (click)="scrollToElement()"
      class='ml-6 bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 bottom-4 active:scale-90 duration-300'
    > 
      <img
        class="m-0 p-0 h-14"
        src="assets/img/arrow.gif"
        alt='Subir'
      />
    </button>
  `,
  styles: ``
})
export class BtnUpComponent {

  scrollToElement(): void {
    const element = document.querySelector(`#id_body`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

}
