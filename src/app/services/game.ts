import { Service, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Game {
  id: number;
  title: string;
  price: number;
  available: boolean;
}

@Service()
export class GameService {
  // URL pointing to the running Django REST API endpoint
  private apiUrl = 'http://127.0.0.1:8000/api/games/';
  private http = inject(HttpClient);

  constructor() {}

  // Fetch games list from the Django backend API
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new game to the backend database
  addGame(title: string, price: number): Observable<Game> {
    const payload = {
      title: title,
      price: price,
      // Django model requires linking a publisher ID. We pass default publisher ID 1
      publisher: 1,
      available: true
    };
    return this.http.post<Game>(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  // Persist game availability updates to the database
  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}${game.id}/`, game).pipe(
      catchError(this.handleError)
    );
  }

  // Asynchronous error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response status code
      errorMessage = `Server returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    // throwError wraps the message in a new Observable error stream
    return throwError(() => new Error(errorMessage));
  }
}
