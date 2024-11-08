import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Subject, take } from 'rxjs';
import { registerForm } from './form';
import { ApiService } from '../shared/api/api.service';
import { User } from '../shared/auth/types';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/auth/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public loading$ = new Subject<boolean>();
  public error$ = new Subject<boolean>();
  public form!: FormGroup;
  public registerForm = registerForm;
  private api = inject(ApiService);
  private router = inject(Router);
  private auth = inject(AuthService);
  private user = inject(UserService);
  constructor() {
    this.createForm();
  }
  public onSubmit(): void {
    if (this.form.valid) {
      this.loading$.next(true);
      this.api
        .post<string>('user', this.form.value)
        .pipe(take(1))
        .subscribe({
          next: async (token) => {
            this.loading$.next(false);
            this.error$.next(false);
            await this.login(token);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.error$.next(true);
            this.loading$.next(false);
            throw new Error('Failed to register', error);
          },
        });
    }
  }

  public clearError(): void {
    this.error$.next(false);
  }
  private async login(token: string): Promise<void> {
    await this.auth.login({
      accessToken: token,
    });
    await this.user.get();
  }
  private createForm(): void {
    const formGroup: { [key: string]: FormControl } = {};
    this.registerForm.forEach((item) => {
      formGroup[item.id] = new FormControl('', item.validators);
    });
    this.form = new FormGroup(formGroup, this.matchingPasswordsValidator('password', 'passwordConfirm'));
  }
  private matchingPasswordsValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormGroup) {
        const password = control.controls[passwordKey];
        const confirmPassword = control.controls[confirmPasswordKey];
        if (password && confirmPassword && password.value === confirmPassword.value) {
          return null;
        } else {
          return { passwordMismatch: true };
        }
      }
      return null;
    };
  }
}
