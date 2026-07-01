import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth';
import { vi } from 'vitest';

describe('authGuard', () => {
  let authServiceSpy: { isAuthenticated: any };
  let routerSpy: { navigate: any };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    authServiceSpy = {
      isAuthenticated: vi.fn()
    };
    routerSpy = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if user is authenticated', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny navigation and redirect to /games if user is unauthenticated', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/games']);
  });
});
