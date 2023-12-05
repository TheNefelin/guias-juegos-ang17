import { Component } from '@angular/core';
import { BtnPokemonComponent } from '../btn-pokemon/btn-pokemon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    RouterLink,
    BtnPokemonComponent 
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  estado: boolean = false;
  theme: string = "night"

  onChange() {
    const html = document.querySelector("html")

    if(this.estado) {
      this.estado = false;
      html?.setAttribute("data-theme", "night")
    } else {
      html?.setAttribute("data-theme", "winter")
      this.estado = true;
    }
  }
}
