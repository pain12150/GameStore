import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { GameListComponent } from './game-list.component';
import { GameService } from '../../services/game';
import { CartService } from '../../services/cart';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameServiceMock: any;
  let cartServiceMock: any;

  beforeEach(async () => {
    gameServiceMock = {
      getGames: () => of([
        { id: 1, title: 'Half-Life 3', price: 29.99, available: true }
      ])
    };

    cartServiceMock = {
      cart: signal([]),
      totalItems: signal(0),
      totalPrice: signal(0)
    };

    await TestBed.configureTestingModule({
      imports: [GameListComponent],
      providers: [
        provideRouter([]),
        { provide: GameService, useValue: gameServiceMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
