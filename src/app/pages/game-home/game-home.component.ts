import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoBackground } from '../../interfaces/juego-background';
import { DataService } from '../../service/data.service';
import { NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LoadingComponent,
  ],
  templateUrl: './game-home.component.html',
  styles: ``
})
export class GameHomeComponent implements OnInit, OnDestroy {
  //inicializar propiedades
  id_juego: number = 0;
  juego_background: JuegoBackground[] = [];
  subscripcion?: Subscription;

  //inicializar constructor
  constructor(
    private activatedRoute: ActivatedRoute, 
    private data_service: DataService,
  ) { }
  
  ngOnInit(): void {
    //subscribe al id que trae la ruta
    this.activatedRoute.params.subscribe(param => {
      this.juego_background.length = 0;

      //validar id que a numerico
      isNaN(Number(param["id"])) ? this.id_juego = 0 : this.id_juego = Number(param["id"]);

      //subscribe a la funcion getAllGame_Background_ByIdGame que trae las imagenes de Juego
      this.subscripcion = this.data_service.getGame_Background_ByIdGame(this.id_juego).subscribe((data: JuegoBackground[]) => {
        this.juego_background = data;
      });
      
    });
  };

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  };
};
