import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { UserSettings } from '../user-settings/types';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private auth: AuthService) {}
  private user: UserSettings | null = null;
  get settings(): UserSettings | null {
    return this.user;
  }
  get name(): string {
    let name = this.user?.name;
    let surname = this.user?.surname;
    if (name && surname) {
      return name + ' ' + surname;
    }
    return 'Neznámý uživatel';
  }
  set settings(user: UserSettings | null) {
    this.user = user;
  }

  public async postSettings(): Promise<void> {
    try {
      await lastValueFrom(
        this.api.post<UserSettings>('user/settings', this.user)
      );
    } catch (e) {
      console.error('Failed to save user settings', e);
    }
  }
  public logout(): void {
    this.auth.logout();
    this.user = null;
  }
  public test(): void {
    this.user = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    };
  }
}
