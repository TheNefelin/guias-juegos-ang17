import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, forkJoin, switchMap, take, takeUntil } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';
import { AuthGoogleService } from '../../services/auth-google.service';
import { JuegoGuia } from '../../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../../interfaces/juego-guia-aventura-img';
import { UserGoogle } from '../../interfaces/user-google';

@Component({
  selector: 'app-game-guide',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './game-guide.component.html',
  styles: ``
})
export class GameGuideComponent implements OnInit {
  private destroy$ = new Subject<void>()
  id: number = 0
  userGoogle!: UserGoogle
  juego_guia: JuegoGuia[] = [];
  juego_guia_aventura: JuegoGuiaAventura[] = [];
  juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDataService: ApiDataService,
    private authGoogleService: AuthGoogleService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => {
        this.id = isNaN(param["id"]) ? 0 : Number(param["id"]);
  
        // Obtén el email del usuario del BehaviorSubject
        return this.authGoogleService.getUserInfo.pipe(
          takeUntil(this.destroy$),
          take(1), // Toma solo el primer valor emitido, ya que es un BehaviorSubject
          switchMap(userInfo => {
            this.userGoogle = userInfo || "none"; // Reemplaza con un valor por defecto si no hay información de email
  
            return forkJoin([
              this.apiDataService.getJuegoGuide_ById(this.id, this.userGoogle.info.email),
              this.apiDataService.getJuegoAdventure_ById(this.id, this.userGoogle.info.email),
              this.apiDataService.getJuegoAdventureImg_ById(this.id),
            ]);
          })
        );
      })
    ).subscribe(([juegoGuia, juegoGuiaAventura, juegoGuiaAventuraImg]) => {
      this.juego_guia = juegoGuia;
      this.juego_guia_aventura = juegoGuiaAventura;
      this.juego_guia_aventura_img = juegoGuiaAventuraImg;
    });
  }
  
  getAventura(id_guia: number) {
    return this.juego_guia_aventura.filter(d => d.id_guia === id_guia)
  }

  getAventuraImg(id_aventura: number) {
    return this.juego_guia_aventura_img.filter(d => d.id_aventura === id_aventura)
  }
  
  checkGuia(idTag: string, idGuia: number, estado: boolean) {
    const el = document.querySelector(`#${idTag}`)
    el?.classList.toggle("bg-success", estado)
    el?.classList.toggle("text-success-content", estado)
    
    this.apiDataService.putCheckGuia(this.userGoogle?.info.email, this.userGoogle?.info.at_hash, idGuia, estado)
    .subscribe(res  => {
      console.log("res: Api-Check-Guia", res)
    })
  }

  checkAventura(idAventura: number, estado: boolean) {
    this.apiDataService.putCheckAventura(this.userGoogle?.info.email, this.userGoogle?.info.at_hash, idAventura, estado)
    .subscribe(res  => {
      console.log("res: Api-Check-Aventura", res)
    })
  }

  scrollToElement(id: string) {
    const element = document.querySelector(`#${id}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

}
