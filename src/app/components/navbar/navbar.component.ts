import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BtnPokemonComponent } from '../btn-pokemon/btn-pokemon.component';
import { AuthGoogleService } from '../../services/auth-google.service';
import { GoogleUser } from '../../interfaces/google-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterLink,
    BtnPokemonComponent 
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  userInfo$?: Observable<GoogleUser>
  estado: boolean = false;

  constructor(private authGoogleService: AuthGoogleService) {
    this.userInfo$ = authGoogleService.getUserInfo;
  }

  logIn(){
    this.authGoogleService.logIn()
  }

  logOut() {
    this.authGoogleService.logOut()
  }

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
