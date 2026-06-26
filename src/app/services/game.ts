import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  title: string;
  price: number;
  available: boolean;
}

@Service()
export class GameService {
  private apiUrl = 'http://localhost:8000/api/games/';
  private http = inject(HttpClient);

  constructor() {}

  // Fetch games list from the Django backend API
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  // Add a new game to the backend database
  addGame(title: string, price: number): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, { title, price, available: true });
  }

  // Persist game availability updates to the database
  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}${game.id}/`, game);
  }
}
