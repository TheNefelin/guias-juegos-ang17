import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';
import { JuegoGuiaPersonaje } from '../../interfaces/juego-guia-personaje';

@Component({
  selector: 'app-game-character',
  standalone: true,
  imports: [ 
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './game-character.component.html',
  styles: ``
})
export class GameCharacterComponent implements OnInit {
  Juego_character$?: Observable<JuegoGuiaPersonaje[]>

  constructor(
    private activatedRoute: ActivatedRoute, 
    private apiDataService: ApiDataService,
  ) {}

  ngOnInit(): void {
    this.Juego_character$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        return this.apiDataService.getJuegoCharacter_ById(isNaN(param["id"]) ? 0 : Number(param["id"]))
      })
    )
  }

}
