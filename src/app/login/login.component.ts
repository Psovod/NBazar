import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/api/api.service';
import { AuthService } from '../shared/auth/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../shared/auth/types';
import { UserService } from '../shared/auth/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private user = inject(UserService);
  public get email() {
    return this.form.controls['email'];
  }
  public get password() {
    return this.form.controls['password'];
  }
  public loading$ = new Subject<boolean>();
  public error$ = new Subject<boolean>();
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public clearError(): void {
    this.error$.next(false);
  }
  public onSubmit(): void {
    this.loading$.next(true);
    this.api
      .post<string>('user/login', this.form.value)
      .pipe(take(1))
      .subscribe({
        next: async (response) => {
          await this.auth.login({
            accessToken: response,
          });
          const form = this.form.value;
          delete form.password;
          await this.user.get();
          this.loading$.next(false);
          this.form.reset();
        },
        error: (error: any) => {
          this.loading$.next(false);
          this.error$.next(true);
          throw new Error(error);
        },
      });
  }
}
