import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { ApiService } from '../shared/api/api.service';
import { Reality, RealityListConfig } from '../shared/reality-list/types';
import { RealityListComponent } from '../shared/reality-list/reality-list.component';
import { AuthService } from '../shared/auth/auth.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { Pagination, SearchPaginationResult } from '../shared/components/pagination/types';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RealityListComponent, PaginationComponent],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
})
export class WatchListComponent {
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public realityList$: Subject<Array<Reality>> = new Subject<Array<Reality>>();
  public config: RealityListConfig = { canDelete: false, canEdit: false, canFavorite: true };
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    lastPage: 0,
  };
  private api = inject(ApiService);
  private auth = inject(AuthService);
  ngOnInit(): void {
    this.handleLoad(this.pagination);
  }
  onPageChange(pagination: Pagination) {
    this.handleLoad(pagination);
  }
  handleLoad(pagination: Pagination) {
    this.loading$.next(true);
    this.api
      .get<SearchPaginationResult<Reality>>(
        `user/favorites/${this.auth.user?.id}?limit=${pagination.itemsPerPage}&page=${pagination.currentPage}`
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.pagination.totalItems = res.total;
          this.pagination.lastPage = res.lastPage;
          this.realityList$.next(res.data);
        },
        error: (err) => {
          throw new Error(err);
        },
        complete: () => {
          this.loading$.next(false);
        },
      });
  }
}
