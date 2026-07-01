import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../services/game';
import { GameService } from '../../services/game';
import { CartService } from '../../services/cart';
import { KeyFormatPipe } from '../../pipes/key-format-pipe';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule, KeyFormatPipe],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCardComponent {
  @Input() game!: Game;
  @Output() remove = new EventEmitter<number>();

  mockKey: string = 'a3f9b21c4de79901cc84';

  constructor(
    private gameService: GameService,
    private cartService: CartService
  ) {}

  addToCart(): void {
    this.cartService.addToCart(this.game);
  }

  toggleAvailability(): void {
    const game = this.game;
    game.available = !game.available;
    this.gameService.updateGame(game).subscribe({
      next: (updatedGame) => {
        console.log('Successfully updated availability:', updatedGame);
      },
      error: (err) => {
        console.error('Error updating game availability:', err);
        // Rollback state locally if update fails
        game.available = !game.available;
      }
    });
  }

  onRemoveClick(): void {
    this.remove.emit(this.game.id);
  }
}
