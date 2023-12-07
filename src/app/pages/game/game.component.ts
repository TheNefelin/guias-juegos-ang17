import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { JuegoDeta } from '../../interfaces/juego-deta';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Subscription } from 'rxjs';

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
export class GameComponent implements OnInit, OnDestroy {
  id_juego: number = 0;
  juego_deta: JuegoDeta[] = [];

  param_subsc?: Subscription;
  juego_subsc?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private data_service: DataService,
  ) {
    console.log("-- COSNTRUCTOR GAME --")
  }

  ngOnInit(): void {
    this.param_subsc = this.activatedRoute.params.subscribe(param => {
      this.juego_deta = [];
      
      this.id_juego = isNaN(Number(param["id"])) ? 0 : Number(param["id"]);
     
      this.juego_subsc = this.data_service.getGame_ById(this.id_juego).subscribe((data: JuegoDeta[]) => {
        this.juego_deta = data;

        console.log(this.juego_deta)
        
        if (this.juego_deta.length === 0) {
          this.router.navigate(["/not-found"]);
        };
      });
    });
  };

  ngOnDestroy(): void {
    this.param_subsc?.unsubscribe();
    this.juego_subsc?.unsubscribe();
  }

  navGuide() {
    this.router.navigate(["game", this.id_juego , "guide", {id: this.id_juego}])    
  }

  navPersonaes() {
    // this.router.navigate(["game", this.id_juego , "character", {id: this.id_juego}])
  }

  navSource() {
    // this.router.navigate(["game", this.id_juego , "source", {id: this.id_juego}])
  }
};
