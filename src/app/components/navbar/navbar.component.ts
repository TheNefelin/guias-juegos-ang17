import { Component } from '@angular/core';
import { BtnPokemonComponent } from '../btn-pokemon/btn-pokemon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ BtnPokemonComponent ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

}
