import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoDeta } from '../../interfaces/juego-deta';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './game.component.html',
  styles: ``
})
export class GameComponent implements OnInit, OnDestroy {
  public id_juego: number = 0;
  public juego_deta: JuegoDeta[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activated_route: ActivatedRoute,
    private router: Router,
    private data_service: DataService,
  ) {
    console.log("-- COSNTRUCTOR GAME --")
  }

  ngOnInit(): void {
    this.activated_route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => {
        this.juego_deta = [];
        this.id_juego = isNaN(Number(param["id"])) ? 0 : Number(param["id"])

        return this.data_service.getGame_ById(this.id_juego)
      }),
    ).subscribe((data: JuegoDeta[]) => {
      this.juego_deta = data;

      if (this.juego_deta.length === 0) {
        this.router.navigate(["/not-found"]);
      };
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

  navGuide() {
    this.router.navigate(["game", this.id_juego, "guide", { id: this.id_juego }])
  };

  navPersonaes() {
    this.router.navigate(["game", this.id_juego, "character", { id: this.id_juego }])
  };

  navSource() {
    this.router.navigate(["game", this.id_juego, "source", { id: this.id_juego }])
  };
};
