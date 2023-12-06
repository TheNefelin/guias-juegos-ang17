import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { Juego } from '../../interfaces/juego';
import { DataService } from '../../service/data.service';
import { JuegoBackground } from '../../interfaces/juego-background';
import { JuegoGuia } from '../../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../../interfaces/juego-guia-aventura-img';
import { JuegoGuiaFuente } from '../../interfaces/juego-guia-fuente';
import { JuegoGuiaPersonaje } from '../../interfaces/juego-guia-personaje';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {
  juegos: Juego[] = [];
  juego_background: JuegoBackground[] = [];
  juego_guia: JuegoGuia[] = [];
  juego_guia_aventura: JuegoGuiaAventura[] = [];
  juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];
  juego_guia_fuente: JuegoGuiaFuente[] = [];
  juego_guia_personaje: JuegoGuiaPersonaje[] = [];

  constructor(private data_service: DataService) {}

  ngOnInit(): void {
    this.data_service.getGame_All().subscribe((data: Juego[]) => {
      this.juegos = data
      console.log(this.juegos)
    })

    // this.data_service.getAllGame_Guia().subscribe((data: JuegoGuia[]) => {
    //   this.juego_guia = data
    //   console.log(this.juego_guia)
    // })

    // this.data_service.getAllGame_Guia_Aventura().subscribe((data: JuegoGuiaAventura[]) => {
    //   this.juego_guia_aventura = data
    //   console.log(this.juego_guia_aventura)
    // })

    // this.data_service.getAllGame_Guia_Aventura_Img().subscribe((data: JuegoGuiaAventuraImg[]) => {
    //   this.juego_guia_aventura_img = data
    //   console.log(this.juego_guia_aventura_img)
    // })

    // this.data_service.getAllGame_Guia_Fuente().subscribe((data: JuegoGuiaFuente[]) => {
    //   this.juego_guia_fuente = data
    //   console.log(this.juego_guia_fuente)
    // })

    // this.data_service.getAllGame_Guia_Personaje().subscribe((data: JuegoGuiaPersonaje[]) => {
    //   this.juego_guia_personaje = data
    //   console.log(this.juego_guia_personaje)
    // })
  }
}
