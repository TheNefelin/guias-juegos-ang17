import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-up',
  standalone: true,
  imports: [],
  template: `
    <a href="#id_body" class='ml-6 bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 bottom-4 hover:scale-110 duration-300'> 
      <img
        class="m-0 p-0 h-14"
        src="assets/img/arrow.gif"
        alt='Subir'
      />
    </a>
  `,
  styles: ``
})
export class BtnUpComponent {

}
