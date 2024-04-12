import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserSettings } from './types';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public loading$ = new Subject<boolean>();
  constructor(public userService: UserService) {
    this.form.patchValue(this.userService.settings as UserSettings);
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
    try {
      await this.userService.postSettings();
      this.userService.settings = this.form.value;
    } catch (e) {
      console.error('Failed to save user settings', e);
    }
    // setTimeout(() => {
    //   this.loading$.next(false);
    // }, 2000);
    this.loading$.next(false);
  }
}
