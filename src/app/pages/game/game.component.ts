import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoDeta } from '../../interfaces/juego-deta';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent,
  ],
  templateUrl: './game.component.html',
  styles: ``
})
export class GameComponent implements OnInit {
  id_juego: any;
  juego_deta: JuegoDeta[] = [];

  constructor(private activatedRoute: ActivatedRoute, private data_service: DataService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.id_juego = param["id"];
      this.juego_deta.length = 0
      
      if (isNaN(Number(this.id_juego))) return 
      const id = Number(this.id_juego)
    
      this.data_service.getGames_ById(this.id_juego).subscribe((data: JuegoDeta[]) => {
        this.juego_deta = data
      })
    });
  }
}
