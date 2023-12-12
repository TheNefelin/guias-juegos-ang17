import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoBackground } from '../../interfaces/juego-background';
import { DataService } from '../../service/data.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-game-home',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LoadingComponent,
  ],
  templateUrl: './game-home.component.html',
  styles: ``
})
export class GameHomeComponent {

  juegoBackground$ = this.activatedRoute.params.pipe(
    switchMap(param => {
      return this.apiDataService.getJuegoBackground_ById(isNaN(param["id"]) ? 0 : Number(param["id"]))
    })
  )

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  // public id_juego: number = 0;
  // public juego_background: JuegoBackground[] = [];
  // private destroy$ = new Subject<void>();

  // constructor(
  //   private activated_route: ActivatedRoute, 
  //   private data_service: DataService,
  // ) { }
  
  // ngOnInit(): void {
  //   this.activated_route.params.pipe(
  //     takeUntil(this.destroy$),
  //     switchMap(param => this.data_service.getGameBackground_ByIdGame(isNaN(Number(param["id"])) ? 0 : Number(param["id"]))),
  //   ).subscribe((data: JuegoBackground[]) => this.juego_background = data);
  // };

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // };
};
