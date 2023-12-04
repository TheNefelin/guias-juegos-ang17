import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-pokemon',
  standalone: true,
  imports: [],
  template: `
    <button
      class='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 flex justify-center w-20'>
      <img
        class="m-0 p-0 flip_pokemon"
        src="assets/img/150.webp"
        alt="mewtwo" 
      />
    </button>
  `,
  styles: ``
})
export class BtnPokemonComponent {

}
