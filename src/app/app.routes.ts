import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetail } from './components/game-detail/game-detail';
import { AddGameForm } from './components/add-game-form/add-game-form';

export const routes: Routes = [
  // Default route: redirects empty path to the catalog list page
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  
  // Standard catalog listing route
  { path: 'games', component: GameListComponent },
  
  // Route to the new game addition reactive form
  { path: 'games/add', component: AddGameForm },
  
  // Dynamic parameter route: matches paths like /games/1 or /games/abc
  { path: 'games/:id', component: GameDetail },
  
  // Wildcard fallback route: matches any invalid URL and handles 404s
  { path: '**', redirectTo: 'games' }
];
