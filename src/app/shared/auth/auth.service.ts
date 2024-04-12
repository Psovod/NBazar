import { Injectable } from '@angular/core';
import { Auth, Authorization } from './types';
import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  constructor(private route: Router) {
    this.auth = {
      id: null,
      isAuthenticated: false,
      authorization: null,
    };
  }
  private setLocalStorage(): void {
    localStorage.setItem('auth', JSON.stringify(this.auth));
  }
  private getLocalStorage(): Auth {
    return JSON.parse(localStorage.getItem('auth') as string);
  }
  private setAuth(_: Authorization) {
    const auth: Auth = (this.auth = {
      id: _.accessToken.tokenable_id,
      isAuthenticated: true,
      authorization: _,
    });
    this.auth = auth;
    this.setLocalStorage();
    this.route.navigate(['/dashboard']);
  }
  public checkLocalStorage() {
    const auth = this.getLocalStorage();
    if (auth) {
      this.auth = auth;
    }
  }
  public async login(auth: Authorization) {
    this.setAuth(auth);
  }
  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
  public getAuthorization() {
    return this.auth.authorization;
  }
  public logout() {
    this.auth = {
      id: null,
      isAuthenticated: false,
      authorization: null,
    };
    this.setLocalStorage();
    this.route.navigate(['/login']);
  }
  public test() {
    this.auth.isAuthenticated = true;
  }
}
