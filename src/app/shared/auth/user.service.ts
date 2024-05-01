import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from './types';
import { AuthService } from './auth.service';
import { lastValueFrom, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  public async update(user: User): Promise<void> {
    this.api
      .patch<boolean>('user', user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.auth.user = {
            ...this.auth.user,
            ...user,
          };
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
  public async get(): Promise<void> {
    try {
      const user = await lastValueFrom(this.api.get<User>('user'));
      this.auth.user = user;
      this.auth.setLocalStorage();
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
