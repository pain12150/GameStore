import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { CartService } from './services/cart';
import { signal } from '@angular/core';

describe('App', () => {
  let cartServiceMock: any;

  beforeEach(async () => {
    cartServiceMock = {
      totalItems: signal(3),
      totalPrice: signal(99.99)
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('GameKey Store');
  });

  it('should render cart summary counts and price from CartService signals', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cartSummaryText = compiled.querySelector('.cart-summary')?.textContent;
    expect(cartSummaryText).toContain('3 items');
    expect(cartSummaryText).toContain('$99.99');
  });
});
