import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderRoutes } from './types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public routes: Array<HeaderRoutes> = [
    {
      name: 'Domů',
      path: '/dashboard',
      public: true,
    },
    {
      name: 'Moje Reality',
      path: '/uzivatel/reality',
      public: false,
    },
    {
      name: 'Sledované',
      path: '/sledovane',
      public: false,
    },
  ];
  public menuOpen: boolean = false;
  private auth = inject(AuthService);
  private router = inject(Router);
  get name() {
    return this.auth.name;
  }
  get isAuthenticated() {
    return this.auth.isAuthenticated;
  }
  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  public logout(): void {
    this.auth.logout();
    this.auth.user = null;
  }
  navigateToWatchList(): void {
    this.toggleMenu();
    this.router.navigate(['/sledovane']);
  }
  navigateToDashboard(): void {
    this.toggleMenu();
    this.router.navigate(['/dashboard']);
  }
  navigateToSettings(): void {
    // if (!this.userService.settings) {
    //   return;
    // }
    this.toggleMenu();

    this.router.navigate(['/uzivatel', this.auth.user?.id ?? 0]);
  }
}
