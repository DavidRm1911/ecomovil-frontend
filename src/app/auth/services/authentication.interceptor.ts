import { HttpInterceptorFn } from '@angular/common/http';

const AUTH_FREE_ENDPOINTS = [
  '/authentication/sign-in',
  '/authentication/sign-up'
];

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const isAuthFree = AUTH_FREE_ENDPOINTS.some(path => request.url.includes(path));

  if (isAuthFree) {
    console.log('[AuthInterceptor] 🚫 Skipping token for:', request.url);
    return next(request);
  }

  const token = localStorage.getItem('token');

  if (token) {
    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('[AuthInterceptor] ✅ Token added to request.');
    return next(cloned);
  } else {
    console.warn('[AuthInterceptor] ⚠️ No token found. Sending unauthenticated request.');
    return next(request);
  }
};
