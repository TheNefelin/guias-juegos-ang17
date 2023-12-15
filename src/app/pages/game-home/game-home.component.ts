import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';
import { JuegoBackground } from '../../interfaces/juego-background';

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
export class GameHomeComponent implements OnInit {
  juego_background$?: Observable<JuegoBackground[]>

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.juego_background$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        return this.apiDataService.getJuegoBackground_ById(isNaN(param["id"]) ? 0 : Number(param["id"]))
      })
    )      
  }

}
