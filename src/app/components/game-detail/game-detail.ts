import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail implements OnInit {
  game: Game | undefined;

  // Inject ActivatedRoute to inspect URL details, and GameService to lookup inventory
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    // Read the dynamic 'id' parameter from the route parameter map
    // The snapshot provides a simple one-time read.
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.gameService.getGames().subscribe({
      next: (games: Game[]) => {
        // Look up the game matching the parsed ID
        this.game = games.find(g => g.id === gameId);
      }
    });
  }
}
