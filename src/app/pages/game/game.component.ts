import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap, take } from 'rxjs';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ApiDataService } from '../../services/api-data.service';

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
export class GameComponent {
  id: number = 0

  juego$ = this.activatedRoute.params.pipe(
    switchMap(param => {
      this.id = isNaN(param["id"]) ? 0 : Number(param["id"])

      return this.apiDataService.getJuegos_ById(this.id);
    })
  )

  constructor(
    private apiDataService: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

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
