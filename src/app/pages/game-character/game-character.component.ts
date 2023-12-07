import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoGuiaPersonaje } from '../../interfaces/juego-guia-personaje';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';

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
  public id_juego: number = 0;
  public juego_personaje: JuegoGuiaPersonaje[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activated_route: ActivatedRoute, 
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => this.data_service.getGame_Guia_Personaje_ByIdGame(isNaN(Number(param["id"])) ? 0 : Number(param["id"]))),
    ).subscribe((data: JuegoGuiaPersonaje[]) => this.juego_personaje = data);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

};
