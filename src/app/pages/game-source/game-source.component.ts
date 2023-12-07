import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { JuegoGuiaFuente } from '../../interfaces/juego-guia-fuente';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-source',
  standalone: true,
  imports: [
    LoadingComponent,
  ],
  templateUrl: './game-source.component.html',
  styles: ``
})
export class GameSourceComponent implements OnInit {
  id_juego: number = 0;
  juego_fuentes: JuegoGuiaFuente[] = [];
  subscripcion?: Subscription;
  
  constructor(
    private activated_route: ActivatedRoute, 
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activated_route.params.subscribe(param => {
      isNaN(Number(param["id"])) ? this.id_juego = 0 : this.id_juego = Number(param["id"]);

      this.subscripcion = this.data_service.getGame_Guia_Fuente_ByIdGame(this.id_juego).subscribe((data: JuegoGuiaFuente[]) => {
        this.juego_fuentes = data;
      });
    });
  };

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  };
};
