import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoDeta } from '../../interfaces/juego-deta';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './game.component.html',
  styles: ``
})
export class GameComponent implements OnInit {
  id_juego: number = 0;
  juego_deta: JuegoDeta[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private data_service: DataService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.juego_deta.length = 0;
      
      isNaN(Number(param["id"])) ? this.id_juego = 0 : this.id_juego = Number(param["id"]);
     
      this.data_service.getGame_ById(this.id_juego).subscribe((data: JuegoDeta[]) => {
        this.juego_deta = data;
        
        if (this.juego_deta.length === 0) {
          this.router.navigate(["/not-found"])
          return
        };
      });
    });
  };

  click_guide() {
    this.router.navigate(["game", this.id_juego , "guide", {id: this.id_juego}])    
  }

  click_personaes() {
    this.router.navigate(["game", this.id_juego , "character", {id: this.id_juego}])
  }

  click_source() {
    this.router.navigate(["game", this.id_juego , "source", {id: this.id_juego}])
  }
};
