import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-pokemon',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="handle_click()"
      class='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 flex justify-center w-20 active:scale-90 duration-300'>
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
  
  handle_click() {
    const sidebar = document.querySelector("#side_bar")
    sidebar?.classList.toggle("hidden")
  }

}
