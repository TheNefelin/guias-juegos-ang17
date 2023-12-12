import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { JuegoDeta } from '../../interfaces/juego-deta';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { Juego } from '../../interfaces/juego';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './game.component.html',
  styles: ``
})
export class GameComponent {
  private id?: number

  juego$ = this.activatedRoute.params.pipe(
    switchMap(param => {
      this.id = isNaN(Number(param["id"])) ? 0 : Number(param["id"])

      return this.apiDataService.getJuegos_ById(this.id);
    })
  );

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // public id_juego: number = 0;
  // public juego_deta: JuegoDeta[] = [];
  // private destroy$ = new Subject<void>();

  // constructor(
  //   private activated_route: ActivatedRoute,
  //   private router: Router,
  //   private data_service: DataService,
  // ) {
  //   console.log("-- COSNTRUCTOR GAME --")
  // }

  // ngOnInit(): void {
  //   this.activated_route.params.pipe(
  //     takeUntil(this.destroy$),
  //     switchMap(param => {
  //       this.juego_deta = [];
  //       this.id_juego = isNaN(Number(param["id"])) ? 0 : Number(param["id"])

  //       return this.data_service.getGame_ById(this.id_juego)
  //     }),
  //   ).subscribe((data: JuegoDeta[]) => {
  //     this.juego_deta = data;

  //     if (this.juego_deta.length === 0) {
  //       this.router.navigate(["/not-found"]);
  //     };
  //   });
  // };

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // };

  navGuide() {
    this.router.navigate(["game", this.id, "guide", { id: this.id }])
  };

  navPersonaes() {
    this.router.navigate(["game", this.id, "character", { id: this.id }])
  };

  navSource() {
    this.router.navigate(["game", this.id, "source", { id: this.id }])
  };
};
