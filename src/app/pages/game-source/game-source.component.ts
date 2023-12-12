import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { JuegoGuiaFuente } from '../../interfaces/juego-guia-fuente';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-source',
  standalone: true,
  imports: [
    LoadingComponent,
  ],
  templateUrl: './game-source.component.html',
  styles: ``
})
export class GameSourceComponent implements OnInit, OnDestroy {
  public id_juego: number = 0;
  public juego_fuentes: JuegoGuiaFuente[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activated_route: ActivatedRoute, 
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => this.data_service.getGame_Guia_Fuente_ByIdGame(isNaN(Number(param["id"])) ? 0 : Number(param["id"]))),
    ).subscribe((data: JuegoGuiaFuente[]) => this.juego_fuentes = data);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
};
