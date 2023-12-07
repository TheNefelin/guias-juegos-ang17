import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoBackground } from '../../interfaces/juego-background';
import { DataService } from '../../service/data.service';
import { NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Subject, switchMap, takeUntil } from 'rxjs';

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
  public id_juego: number = 0;
  public juego_background: JuegoBackground[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private data_service: DataService,
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => this.data_service.getGameBackground_ByIdGame(isNaN(Number(param["id"])) ? 0 : Number(param["id"])))
    ).subscribe((data: JuegoBackground[]) => this.juego_background = data);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
};
