import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { Juego } from '../../interfaces/juego';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {
  public juegos$?: Observable<Juego[]>

  constructor(private apiDataService: ApiDataService) {}

  ngOnInit(): void {
    this.juegos$ = this.apiDataService.getJuegos()
  }

}
