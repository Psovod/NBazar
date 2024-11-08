import { Injectable, inject } from '@angular/core';
import { Auth, AuthRole, Authorization, User } from './types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private default: Auth = {
    user: null,
    isAuthenticated: false,
    authorization: null,
  };
  private auth: Auth = this.default;
  private router = inject(Router);

  public set user(user: User | null) {
    this.auth.user = user;
  }
  public set watched(watched: string) {
    if (this.auth.user?.watched_estates) {
      this.auth.user.watched_estates.push(watched);
    }
  }
  get isAdmin(): boolean {
    return this.auth.user?.role === AuthRole.ADMIN;
  }
  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
  get authorization(): Authorization | null {
    return this.auth.authorization;
  }
  get user(): User | null {
    return this.auth.user;
  }
  get name(): string {
    let name = this.user?.name;
    let surname = this.user?.surname;
    if (name && surname) {
      return name + ' ' + surname;
    }
    return 'Neznámý uživatel';
  }
  get token(): string | undefined {
    return this.auth.authorization?.accessToken;
  }

  public setLocalStorage(): void {
    localStorage.setItem('auth', JSON.stringify(this.auth));
  }

  public checkLocalStorage() {
    const auth = this.getLocalStorage();
    if (auth) {
      this.auth = auth;
    }
  }
  public async login(auth: Authorization) {
    await this.setAuth(auth);
  }
  public logout() {
    this.auth = this.default;
    this.setLocalStorage();
    this.router.navigate(['/login']);
  }

  private getLocalStorage(): Auth {
    return JSON.parse(localStorage.getItem('auth') as string);
  }
  private async setAuth(_: Authorization) {
    const auth: Auth = (this.auth = {
      user: null,
      isAuthenticated: true,
      authorization: _,
    });
    this.auth = auth;
    this.user;
    this.setLocalStorage();

    this.router.navigate(['/dashboard']);
  }
}
