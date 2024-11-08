import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, lastValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/auth/user.service';
import { User } from '../shared/auth/types';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private auth = inject(AuthService);
  private user = inject(UserService);
  private api = inject(ApiService);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
  });
  public isLoading$: Subject<boolean> = new Subject<boolean>();
  async ngOnInit(): Promise<void> {
    await lastValueFrom(this.api.get<User>('user')).then((user) => {
      this.auth.user = user;
      this.auth.setLocalStorage();
      this.form.patchValue(user);
    });
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
    if (this.password.value === '') delete this.form.value.password;
    this.isLoading$.next(true);
    await this.user.update(this.form.value);
    this.isLoading$.next(false);
  }
}
