import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../service/data.service';
import { JuegoGuia } from '../../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../../interfaces/juego-guia-aventura-img';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';

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
  id_juego: number = 0;
  check_guia: boolean = false;
  check_aventura: boolean = false;

  subscri_guia?: Subscription;
  subscri_guia_aventura?: Subscription;
  subscri_guia_aventura_img?: Subscription;

  juego_guia: JuegoGuia[] = [];
  juego_guia_aventura: JuegoGuiaAventura[] = [];
  juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];

  constructor(
    private activated_route: ActivatedRoute,
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.subscribe(param => {
      isNaN(Number(param["id"])) ? this.id_juego = 0 : this.id_juego = Number(param["id"]);
    
      this.subscri_guia = this.data_service.getGame_Guia(this.id_juego, "n").subscribe((data: JuegoGuia[]) => {
        this.juego_guia = data;
      });

      this.subscri_guia_aventura = this.data_service.getGame_Guia_Aventura(this.id_juego, "n").subscribe((data: JuegoGuiaAventura[]) => {
        this.juego_guia_aventura = data;
      });

      this.subscri_guia_aventura_img = this.data_service.getGame_Guia_Aventura_Img(this.id_juego).subscribe((data: JuegoGuiaAventuraImg[]) => {
        this.juego_guia_aventura_img = data;
      });
    });
  };

  ngOnDestroy(): void {
    this.subscri_guia?.unsubscribe();
    this.subscri_guia_aventura?.unsubscribe();
    this.subscri_guia_aventura_img?.unsubscribe();
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
