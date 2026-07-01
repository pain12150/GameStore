import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs';

// Functional Interceptor definition
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Inject the AuthService dynamically inside functional interceptor context
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Check if a token exists in localStorage
  if (token) {
    // Clone the request because HTTP requests are immutable.
    // Inject the Authorization header: Django DRF expects 'Token <key_string>' format
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    // Pass the cloned request to the next interceptor or handler in the chain
    return next(clonedRequest);
  }

  // If no token exists, pass the unmodified request
  return next(req);
};
