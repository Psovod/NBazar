import { Component, inject } from '@angular/core';
import { AuthRole, User } from '../shared/auth/types';
import { BehaviorSubject, Subject, last, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/modal/modal.service';
import { AdminEditUserComponent } from './modal/admin-edit-user/admin-edit-user.component';
import { ApiService } from '../shared/api/api.service';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../shared/components/confirm-delete/confirm-delete.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { Pagination, SearchPaginationResult } from '../shared/components/pagination/types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  providers: [ModalService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private modal = inject(ModalService);
  private api = inject(ApiService);
  private router = inject(Router);
  public users: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    lastPage: 0,
  };
  ngOnInit(): void {
    this.load();
  }
  public pageChange(pagination: Pagination): void {
    this.pagination = pagination;
    this.load();
  }
  public view(user: User): void {
    this.router.navigate([`${user.id}/moje-reality`]);
  }
  public edit(user: User): void {
    this.modal
      .open<AdminEditUserComponent, User>(AdminEditUserComponent, 'Editace Uživatele', user)
      .subscribe((res) => {
        if (res) {
          this.update(res);
        }
      });
  }
  public delete(user: User): void {
    this.modal
      .open<ConfirmDeleteComponent, boolean>(ConfirmDeleteComponent, 'Potvrdtě smazání uživatele', user.email)
      .subscribe((res) => {
        if (res) {
          this.api
            .delete<boolean>(`user/${user.id}`)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.users.next(this.users.value.filter((u) => u.id !== user.id));
              },
              error: (err) => {
                throw new Error(err);
              },
            });
        }
      });
  }
  private load(): void {
    this.loading$.next(true);
    this.api
      .get<SearchPaginationResult<User>>(
        `users?limit=${this.pagination.itemsPerPage}&page=${
          (this.pagination.currentPage - 1) * this.pagination.itemsPerPage
        }`
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.pagination = {
            ...this.pagination,
            totalItems: result.total,
            lastPage: result.lastPage,
          };
          this.users.next(result.data);
          this.loading$.next(false);
        },
        error: (err) => {
          this.loading$.next(false);
          throw new Error(err);
        },
      });
  }
  private update(user: User): void {
    this.api
      .patch<boolean>('user', user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.users.next(this.users.value.map((u) => (u.id === user.id ? user : u)));
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
}
