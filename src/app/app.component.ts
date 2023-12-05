import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BtnUpComponent } from './components/btn-up/btn-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Juego } from './interfaces/juego';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule,
    NavbarComponent, 
    BtnUpComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent implements OnInit {
  title = 'Guias Juegos';
  dataJuegos: Juego[] = []

  httpClient = inject(HttpClient)

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos() {
    this.httpClient
    .get("https://bsite.net/metalflap/gj_juegos")
    .subscribe((data: any) => {
      this.dataJuegos = data;
    });
  }
}
