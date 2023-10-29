// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let isLoggedIn = (sessionStorage.getItem('isLoggedIn') == 'true') ? 'true' : 'false';
    if (isLoggedIn == 'true') {
      return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
