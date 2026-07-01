import { TestBed } from '@angular/core/testing';
import { CartService } from './cart';
import { Game } from './game';

class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: new LocalStorageMock(),
    writable: true
  });
}

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty cart', () => {
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
    expect(service.cart()).toEqual([]);
  });

  it('should add games to the cart and compute total items and price', () => {
    const game1: Game = { id: 1, title: 'Game One', price: 10.0, available: true };
    const game2: Game = { id: 2, title: 'Game Two', price: 25.5, available: false };

    service.addToCart(game1);
    expect(service.totalItems()).toBe(1);
    expect(service.totalPrice()).toBe(10.0);

    service.addToCart(game2);
    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBe(35.5);
    expect(service.cart()).toEqual([game1, game2]);
  });

  it('should remove games from the cart by id', () => {
    const game1: Game = { id: 1, title: 'Game One', price: 10.0, available: true };
    const game2: Game = { id: 2, title: 'Game Two', price: 25.5, available: false };

    service.addToCart(game1);
    service.addToCart(game2);
    expect(service.totalItems()).toBe(2);

    service.removeFromCart(1);
    expect(service.totalItems()).toBe(1);
    expect(service.totalPrice()).toBe(25.5);
    expect(service.cart()).toEqual([game2]);
  });

  it('should clear the cart', () => {
    const game: Game = { id: 1, title: 'Game One', price: 10.0, available: true };
    service.addToCart(game);
    expect(service.totalItems()).toBe(1);

    service.clearCart();
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
    expect(service.cart()).toEqual([]);
  });
});
