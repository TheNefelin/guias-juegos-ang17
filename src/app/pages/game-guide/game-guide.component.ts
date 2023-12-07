import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, forkJoin, switchMap, takeUntil } from 'rxjs';
import { DataService } from '../../service/data.service';
import { JuegoGuia } from '../../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../../interfaces/juego-guia-aventura-img';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';
import { JuegoBackground } from '../../interfaces/juego-background';

@Component({
  selector: 'app-game-guide',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LoadingComponent,
  ],
  templateUrl: './game-guide.component.html',
  styles: ``
})
export class GameGuideComponent implements OnInit, OnDestroy {
  public id_juego: number = 0;
  public check_guia: boolean = false;
  public check_aventura: boolean = false;
  public juego_guia: JuegoGuia[] = [];
  public juego_guia_aventura: JuegoGuiaAventura[] = [];
  public juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private activated_route: ActivatedRoute,
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => {
        this.id_juego = isNaN(Number(param["id"])) ? 0 : Number(param["id"]);

        return forkJoin([
          this.data_service.getGame_Guia(this.id_juego, "n"),
          this.data_service.getGame_Guia_Aventura(this.id_juego, "n"),
          this.data_service.getGame_Guia_Aventura_Img(this.id_juego),
        ]);
      }),
    ).subscribe(([juegoGuia, juegoGuiaAventura, juegoGuiaAventuraImg]) => {
      this.juego_guia = juegoGuia;
      this.juego_guia_aventura = juegoGuiaAventura;
      this.juego_guia_aventura_img = juegoGuiaAventuraImg;
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

  checkGuia(id: string, estado: boolean) {
    const tag_check = document.querySelector(`#${id}`) as HTMLInputElement;
    console.log(estado)
    console.log(tag_check)
    tag_check.classList.toggle("bg-success");
    tag_check.classList.toggle("text-success-content");
    //  email={email}
    //  token={token}
  };

  checkAventura(id: number) {
    //  email={email}
    //  token={token}
  };

  filterGuiaAventura(id_guia: number) {
    return this.juego_guia_aventura.filter(e => e.id_guia === id_guia);
  };

  filterGuiaAventuraImg(id_aventura: number) {
    return this.juego_guia_aventura_img.filter(e => e.id_aventura === id_aventura);
  };

  scrollToElement(id_guia: string): void {
    const element = document.querySelector(`#${id_guia}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };
  };

};
