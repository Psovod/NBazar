import { ApplicationRef, Component, ComponentRef, EventEmitter, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthRole, User } from '../../../shared/auth/types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminEditUserForm } from './types';

@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.scss',
})
export class AdminEditUserComponent {
  @Output() outputEvent: EventEmitter<User> = new EventEmitter<User>();
  public dialogRef: ComponentRef<AdminEditUserComponent> | null = null;
  public title!: string;
  public content!: User;
  public roleOptions: Array<AuthRole> = [AuthRole.ADMIN, AuthRole.USER];
  public closeIcon: IconDefinition = faClose;
  public forms: Array<AdminEditUserForm> = [];
  private appRef = inject(ApplicationRef);
  ngOnInit(): void {
    this.forms = [
      {
        label: 'Jméno',
        key: 'name',
        value: this.content.name,
        type: 'text',
      },
      {
        label: 'Příjmení',
        key: 'surname',
        value: this.content.surname,
        type: 'text',
      },
      {
        label: 'Email',
        key: 'email',
        value: this.content.email,
        type: 'email',
      },
      {
        label: 'Role',
        key: 'role',
        value: this.content.role,
        type: 'select',
      },
    ];
  }
  public close(): void {
    this.appRef.detachView(this.dialogRef?.hostView as any);
    this.dialogRef?.destroy();
  }
  public save(): void {
    if (this.isValid) {
      this.updateUser();
      this.outputEvent.emit(this.content);
      this.appRef.detachView(this.dialogRef?.hostView as any);
      this.dialogRef?.destroy();
    }
  }
  private updateUser(): void {
    const user: User = this.forms
      .map((form) => ({ [form.key]: form.value }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {} as User);
    this.content = { ...this.content, ...user };
  }
  private get isValid(): boolean {
    return this.forms.every((form) => form.value !== '');
  }
}
