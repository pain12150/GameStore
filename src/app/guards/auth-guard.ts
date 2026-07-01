import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verify token exists in localStorage
  if (authService.isAuthenticated()) {
    return true; // Authorize route activation
  }

  // If unauthenticated, redirect to catalog page
  router.navigate(['/games']);
  return false; // Deny route activation
};
