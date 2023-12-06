import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BtnUpComponent } from './components/btn-up/btn-up.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    BtnUpComponent,
    SidebarComponent,
    NotFoundComponent,
  ],
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent {
  title = 'Guias Juegos';
}
