import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, switchMap, take } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';
import { AuthGoogleService } from '../../services/auth-google.service';
import { JuegoGuia } from '../../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../../interfaces/juego-guia-aventura-img';
import { UserInfo } from 'angular-oauth2-oidc';
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
  id: number = 0
  userGoogle!: UserGoogle
  public juego_guia: JuegoGuia[] = [];
  public juego_guia_aventura: JuegoGuiaAventura[] = [];
  public juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];
  // sliferhunter8@gmail.com

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDataService: ApiDataService,
    private authGoogleService: AuthGoogleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(param => {
        this.id = isNaN(param["id"]) ? 0 : Number(param["id"]);
  
        // Obtén el email del usuario del BehaviorSubject
        return this.authGoogleService.getUserInfo.pipe(
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
    estado ? el?.classList.add("bg-success", "text-success-content") : el?.classList.remove("bg-success", "text-success-content")
    this.cdr.detectChanges()

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

};

// public id_juego: number = 0;
// public check_guia: boolean = false;
// public check_aventura: boolean = false;
// public juego_guia: JuegoGuia[] = [];
// public juego_guia_aventura: JuegoGuiaAventura[] = [];
// public juego_guia_aventura_img: JuegoGuiaAventuraImg[] = [];
// private destroy$ = new Subject<void>();

// constructor(
//   private activated_route: ActivatedRoute,
//   private data_service: DataService,
// ) { }

// ngOnInit(): void {
//   this.activated_route.params.pipe(
//     takeUntil(this.destroy$),
//     switchMap(param => {
//       this.id_juego = isNaN(Number(param["id"])) ? 0 : Number(param["id"]);

//       return forkJoin([
//         this.data_service.getGame_Guia(this.id_juego, "n"),
//         this.data_service.getGame_Guia_Aventura(this.id_juego, "n"),
//         this.data_service.getGame_Guia_Aventura_Img(this.id_juego),
//       ]);
//     }),
//   ).subscribe(([juegoGuia, juegoGuiaAventura, juegoGuiaAventuraImg]) => {
//     this.juego_guia = juegoGuia;
//     this.juego_guia_aventura = juegoGuiaAventura;
//     this.juego_guia_aventura_img = juegoGuiaAventuraImg;
//   });
// };

// ngOnDestroy(): void {
//   this.destroy$.next();
//   this.destroy$.complete();
// };

// checkGuia(id: string, estado: boolean) {
//   const tag_check = document.querySelector(`#${id}`) as HTMLInputElement;
//   console.log(estado)
//   console.log(tag_check)
//   tag_check.classList.toggle("bg-success");
//   tag_check.classList.toggle("text-success-content");
//   //  email={email}
//   //  token={token}
// };

// checkAventura(id: number) {
//   //  email={email}
//   //  token={token}
// };

// filterGuiaAventura(id_guia: number) {
//   return this.juego_guia_aventura.filter(e => e.id_guia === id_guia);
// };

// filterGuiaAventuraImg(id_aventura: number) {
//   return this.juego_guia_aventura_img.filter(e => e.id_aventura === id_aventura);
// };

// scrollToElement(id_guia: string): void {
//   const element = document.querySelector(`#${id_guia}`);

//   if (element) {
//     element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
//   };
// };



