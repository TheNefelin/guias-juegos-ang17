import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
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

  juego_background$ = this.activatedRoute.params.pipe(
    switchMap(param => {
      return this.apiDataService.getJuegoBackground_ById(isNaN(param["id"]) ? 0 : Number(param["id"]))
    })
  )

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

};
