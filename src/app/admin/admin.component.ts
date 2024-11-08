import { Component, inject } from '@angular/core';
import { User } from '../shared/auth/types';
import { BehaviorSubject, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/modal/modal.service';
import { AdminEditUserComponent } from './modal/admin-edit-user/admin-edit-user.component';
import { ApiService } from '../shared/api/api.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../shared/components/confirm-delete/confirm.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { Pagination, SearchPaginationResult } from '../shared/components/pagination/types';
import { AdminFilterType, AdminFilterTypeList } from './types';
import { Reality, RealityListConfig } from '../shared/reality-list/types';
import { RealityListComponent } from '../shared/reality-list/reality-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RealityListComponent],
  providers: [ModalService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private modal = inject(ModalService);
  private api = inject(ApiService);
  private router = inject(Router);
  public users$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
  public realityList$: BehaviorSubject<Array<Reality>> = new BehaviorSubject<Array<Reality>>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public config: RealityListConfig = {
    canDelete: true,
    canEdit: true,
    canShowReport: true,
  };
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    lastPage: 0,
  };
  public filter: AdminFilterType = {
    users: {
      name: 'Správa uživatelů',
      info: 'Správa uživatelů a jejich oprávnění',
      active: true,
      _name: 'users',
    },
    reality: {
      name: 'Nahlášené nemovitosti',
      info: 'Správa nahlášených nemovitostí',
      active: false,
      _name: 'reality',
    },
    active: {
      name: 'Správa uživatelů',
      info: 'Správa uživatelů a jejich oprávnění',
      active: true,
      _name: 'users',
    },
  };
  public changeList(list: AdminFilterTypeList): void {
    this.pagination = {
      ...this.pagination,
      currentPage: 1,
      itemsPerPage: 10,
    };
    this.filter.active = list;
    if (list._name === 'users') {
      this.loadUsers();
    } else {
      this.loadRealityList();
    }
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  public pageChange(pagination: Pagination): void {
    this.pagination = pagination;
    this.loadUsers();
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
      .open<ConfirmComponent, boolean>(ConfirmComponent, 'Potvrdtě smazání uživatele', {
        input: user.email,
        message: 'smazat',
      })
      .subscribe((res) => {
        if (res) {
          this.api
            .delete<boolean>(`user/${user.id}`)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.users$.next(this.users$.value.filter((u) => u.id !== user.id));
              },
              error: (err) => {
                throw new Error(err);
              },
            });
        }
      });
  }
  private loadRealityList(): void {
    this.loading$.next(true);
    this.api
      .get<SearchPaginationResult<Reality>>(
        `estates/reported?limit=${this.pagination.itemsPerPage}&page=${this.pagination.currentPage}`
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.pagination.totalItems = res.total;
          this.pagination.lastPage = res.lastPage;
          this.realityList$.next(res.data);
          this.loading$.next(false);
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
  private loadUsers(): void {
    this.loading$.next(true);
    this.api
      .get<SearchPaginationResult<User>>(
        `users?limit=${this.pagination.itemsPerPage}&page=${this.pagination.currentPage}`
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.pagination = {
            ...this.pagination,
            totalItems: result.total,
            lastPage: result.lastPage,
          };
          this.users$.next(result.data);
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
          this.users$.next(this.users$.value.map((u) => (u.id === user.id ? user : u)));
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
}
