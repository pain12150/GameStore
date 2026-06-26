import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AddGameForm } from './add-game-form';
import { GameService } from '../../services/game';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('AddGameForm', () => {
  let component: AddGameForm;
  let fixture: ComponentFixture<AddGameForm>;
  let gameService: GameService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGameForm],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGameForm);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid controls (empty title and price 0)', () => {
    expect(component.gameForm.valid).toBeFalsy();
    expect(component.title?.value).toBe('');
    expect(component.price?.value).toBe(0);
  });

  it('should invalidate title starting with lowercase letter', () => {
    const titleControl = component.title;
    titleControl?.setValue('half-life 3');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.errors?.['titleLowercase']).toBeTruthy();
  });

  it('should validate title starting with uppercase letter', () => {
    const titleControl = component.title;
    titleControl?.setValue('Half-Life 3');
    expect(titleControl?.valid).toBeTruthy();
  });

  it('should invalidate price less than 1', () => {
    const priceControl = component.price;
    priceControl?.setValue(0);
    expect(priceControl?.valid).toBeFalsy();
    expect(priceControl?.errors?.['min']).toBeTruthy();
  });

  it('should call GameService.addGame and navigate when form is valid on submit', () => {
    const addGameSpy = vi.spyOn(gameService, 'addGame').mockReturnValue(of({ id: 99, title: 'Portal 3', price: 25.00, available: true }));
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.title?.setValue('Portal 3');
    component.price?.setValue(25.00);
    expect(component.gameForm.valid).toBeTruthy();

    component.onSubmit();

    expect(addGameSpy).toHaveBeenCalledWith('Portal 3', 25.00);
    expect(navigateSpy).toHaveBeenCalledWith(['/games']);
  });
});
