import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { GameDetail } from './game-detail';
import { GameService } from '../../services/game';

describe('GameDetail', () => {
  let component: GameDetail;
  let fixture: ComponentFixture<GameDetail>;
  let gameServiceMock: any;

  beforeEach(async () => {
    gameServiceMock = {
      getGames: () => of([
        { id: 1, title: 'Half-Life 3', price: 29.99, available: true }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [GameDetail],
      providers: [
        provideRouter([]),
        { provide: GameService, useValue: gameServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
