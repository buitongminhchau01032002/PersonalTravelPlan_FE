import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.getUser()) {
        return true;
    }

    // Redirect to the login page
    return router.parseUrl('/login');
};
