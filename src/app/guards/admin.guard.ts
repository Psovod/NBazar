import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAdmin) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
