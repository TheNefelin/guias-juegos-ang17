import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { Juego } from '../../interfaces/juego';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs';

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
  public juegos$!: Observable<Juego[]>;
 
  constructor(private data_service: DataService) {}

  ngOnInit(): void {
    this.juegos$ = this.data_service.getGame$();
  };
};
