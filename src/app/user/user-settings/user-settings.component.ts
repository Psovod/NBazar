import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/auth/types';
import { UserService } from '../../shared/auth/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  private auth = inject(AuthService);
  private user = inject(UserService);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public loading$ = new Subject<boolean>();
  constructor() {
    this.form.patchValue(this.auth.user as User);
  }
  get name() {
    return this.form.controls['name'];
  }
  get surname() {
    return this.form.controls['surname'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }
  async onSubmit(): Promise<void> {
    this.loading$.next(true);
    await this.user.update(this.form.value);
    this.loading$.next(false);
  }
}
