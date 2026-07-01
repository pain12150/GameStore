import { Component, OnInit } from '@angular/core'; // Import OnInit lifecycle hook
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game'; // Import service class and interface
import { GameCardComponent } from '../game-card/game-card';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  // Component state properties
  newGameTitle: string = '';
  newGamePrice: number = 0;
  
  // Define an empty array that will hold our fetched games
  games: Game[] = [];

  // Injecting the service in the class constructor
  constructor(private gameService: GameService) {}

  // ngOnInit runs automatically once the component is initialized in the DOM
  ngOnInit(): void {
    this.fetchGames();
  }

  // Call service getGames Observable and subscribe to the output stream
  fetchGames(): void {
    this.gameService.getGames().subscribe({
      next: (data: Game[]) => {
        this.games = data;
      },
      error: (err) => {
        console.error('Error fetching games: ', err);
      }
    });
  }

  // Method to handle adding a game via service and updating local view
  addGame(): void {
    if (this.newGameTitle.trim() === '') return;
    
    this.gameService.addGame(this.newGameTitle, this.newGamePrice).subscribe({
      next: (newGame: Game) => {
        // Re-fetch list to update UI state
        this.fetchGames();
        this.newGameTitle = '';
        this.newGamePrice = 0;
      },
      error: (err) => {
        console.error('Error adding game: ', err);
      }
    });
  }

  // Parent handler for child component remove emitter
  onRemoveGame(gameId: number): void {
    this.games = this.games.filter(g => g.id !== gameId);
    console.log(`[Parent Component] Removed game ID: ${gameId}`);
  }
}
