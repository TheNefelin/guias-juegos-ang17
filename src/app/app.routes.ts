import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game/:id", component: GameComponent },
  { path: "**", component: NotFoundComponent },
];
