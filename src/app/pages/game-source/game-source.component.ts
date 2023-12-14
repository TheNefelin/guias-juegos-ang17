import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-game-source',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './game-source.component.html',
  styles: ``
})
export class GameSourceComponent {

  juego_fuentes$ = this.activatedRoute.params.pipe(
    switchMap(param => {
      return this.apiDataService.getJuegoFuente_ById(isNaN(Number(param["id"])) ? 0 : Number(param["id"]));
    })
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDataService: ApiDataService,
  ) {}
  
};
