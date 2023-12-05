import { Component, Input } from '@angular/core';
import { Juego } from '../../interfaces/juego';
import { LoadingComponent } from '../loading/loading.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LoadingComponent
  ],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  @Input() juegos: Juego[] = [];

}
