import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BtnUpComponent } from './components/btn-up/btn-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    BtnUpComponent
  ],
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent {
  title = 'Guias Juegos';

}
