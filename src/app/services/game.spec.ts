import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GameService, Game } from './game';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://127.0.0.1:8000/api/games/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GameService
      ]
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch games (GET)', () => {
    const dummyGames: Game[] = [
      { id: 1, title: 'Half-Life 3', price: 29.99, available: true },
      { id: 2, title: 'Portal 3', price: 19.99, available: true }
    ];

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  });

  it('should add a game (POST)', () => {
    const newGame: Game = { id: 3, title: 'Cyberpunk 2077', price: 49.99, available: true };

    service.addGame('Cyberpunk 2077', 49.99).subscribe(game => {
      expect(game).toEqual(newGame);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      title: 'Cyberpunk 2077',
      price: 49.99,
      publisher: 1,
      available: true
    });
    req.flush(newGame);
  });

  it('should update a game availability (PUT)', () => {
    const updatedGame: Game = { id: 1, title: 'Half-Life 3', price: 29.99, available: false };

    service.updateGame(updatedGame).subscribe(game => {
      expect(game).toEqual(updatedGame);
    });

    const req = httpMock.expectOne(`${apiUrl}1/`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedGame);
    req.flush(updatedGame);
  });

  it('should handle HTTP error gracefully', () => {
    service.getGames().subscribe({
      next: () => {
        throw new Error('expected an error, not games');
      },
      error: (error: Error) => {
        expect(error.message).toContain('Server returned code 500');
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
