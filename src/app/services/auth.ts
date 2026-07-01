import { Service } from '@angular/core';

@Service()
export class AuthService {
  private tokenKey = 'authToken';

  // Save token in browser storage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from browser storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Delete token (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if token exists
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
