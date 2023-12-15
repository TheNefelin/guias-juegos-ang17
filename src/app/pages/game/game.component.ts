import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';
import { Juego } from '../../interfaces/juego';

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
export class GameComponent implements OnInit {
  id: number = 0
  juego$?: Observable<Juego[]>

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.juego$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        this.id = isNaN(param["id"]) ? 0 : Number(param["id"])
  
        return this.apiDataService.getJuegos_ById(this.id);
      })
    )
  }

  navGuide() {
    this.router.navigate(["game", this.id, "guide", { id: this.id }])
  }

  navPersonaes() {
    this.router.navigate(["game", this.id, "character", { id: this.id }])
  }

  navSource() {
    this.router.navigate(["game", this.id, "source", { id: this.id }])
  }
  
}
