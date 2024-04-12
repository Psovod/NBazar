import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, pipe } from 'rxjs';
import { ApiService } from '../shared/api/api.service';
import { Authorization } from '../shared/auth/types';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../user/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private user: UserService
  ) {}
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
      .post<Authorization>('/login', this.form.value)
      .pipe(take(1))
      .subscribe({
        next: async (response) => {
          await this.auth.login(response);
          const form = this.form.value;
          delete form.password;
          this.user.settings = form;
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
