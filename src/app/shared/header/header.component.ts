import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderRoutes } from './types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  public icon: IconDefinition = faHome;
  public routes: Array<HeaderRoutes> = [
    {
      name: 'Domů',
      path: '/dashboard',
      public: true,
    },
    {
      name: 'Moje Reality',
      path: `${this.auth.user?.id}/moje-reality`,
      public: false,
      redirect: true,
    },
    {
      name: 'Sledované',
      path: '/sledovane',
      public: false,
    },
  ];
  public menuOpen: boolean = false;
  get name() {
    return this.auth.name;
  }
  get isAdmin() {
    return this.auth.isAdmin;
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
  public navigateToMyReality(): void {
    this.router.navigate([`/${this.auth.user?.id}/moje-reality`]);
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
    this.toggleMenu();
    this.router.navigate(['/uzivatel', this.auth.user?.id ?? 0]);
  }
}
