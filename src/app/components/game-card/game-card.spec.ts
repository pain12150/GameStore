import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { GameCardComponent } from './game-card';
import { GameService } from '../../services/game';
import { CartService } from '../../services/cart';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let gameServiceMock: any;
  let cartServiceMock: any;

  beforeEach(async () => {
    gameServiceMock = {
      updateGame: vi.fn().mockReturnValue(of({}))
    };

    cartServiceMock = {
      addToCart: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
      providers: [
        provideRouter([]),
        { provide: GameService, useValue: gameServiceMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.game = { id: 1, title: 'Mock Game', price: 15.0, available: true };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game title and formatted price', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.game-title')?.textContent).toContain('Mock Game');
    expect(compiled.querySelector('.price-tag')?.textContent).toContain('$15.00');
  });

  it('should format mockKey using keyFormat pipe', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.key-code')?.textContent).toBe('A3F9-B21C-4DE7-9901-CC84');
  });

  it('should call CartService.addToCart when addToCart method is called', () => {
    component.addToCart();
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(component.game);
  });

  it('should toggle availability and update game service status when toggleAvailability is called', () => {
    expect(component.game.available).toBe(true);
    component.toggleAvailability();
    expect(component.game.available).toBe(false);
    expect(gameServiceMock.updateGame).toHaveBeenCalledWith(component.game);
  });

  it('should emit remove event with game ID when onRemoveClick is called', () => {
    let emittedId: number | undefined;
    component.remove.subscribe((id) => {
      emittedId = id;
    });

    component.onRemoveClick();
    expect(emittedId).toBe(1);
  });
});
