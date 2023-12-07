import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GameHomeComponent } from './pages/game-home/game-home.component';
import { GameCharacterComponent } from './pages/game-character/game-character.component';
import { GameGuideComponent } from './pages/game-guide/game-guide.component';
import { GameSourceComponent } from './pages/game-source/game-source.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { 
    path: "game/:id", 
    component: GameComponent, 
    children: [
      { path: "", component: GameHomeComponent },
      { path: "character", component: GameCharacterComponent },
      { path: "guide", component: GameGuideComponent },
      { path: "source", component: GameSourceComponent },
    ]
  },
  // { path: "**", pathMatch: 'full', component: NotFoundComponent },
];
