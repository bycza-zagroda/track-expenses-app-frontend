import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

export const loggedInUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserLoggedIn$.pipe(
    tap((val) => {
      if (!val) {
        void router.navigate(['/auth/sign-in']);
      }
    }),
  );
};
