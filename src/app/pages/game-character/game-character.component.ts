import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoGuiaPersonaje } from '../../interfaces/juego-guia-personaje';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-character',
  standalone: true,
  imports: [ 
    NgOptimizedImage,
    LoadingComponent,
  ],
  templateUrl: './game-character.component.html',
  styles: ``
})
export class GameCharacterComponent implements OnInit {
  id_juego: number = 0;
  juego_personaje: JuegoGuiaPersonaje[] = [];
  subscripcion?: Subscription;

  constructor(
    private activated_route: ActivatedRoute, 
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.subscribe(param => {
      isNaN(Number(param["id"])) ? this.id_juego = 0 : this.id_juego = Number(param["id"]);

      this.subscripcion = this.data_service.getGame_Guia_Personaje_ByIdGame(this.id_juego).subscribe((data: JuegoGuiaPersonaje[]) => {
        this.juego_personaje = data;
      });
    });
  };
  
  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  };
};
