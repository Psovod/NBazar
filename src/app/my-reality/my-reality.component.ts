import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ModalService } from '../shared/modal/modal.service';
import { RealityCreateComponent } from '../reality/reality-create/reality-create.component';
import { ApiService } from '../shared/api/api.service';
import { RealityListComponent } from '../shared/reality-list/reality-list.component';
import { Reality, RealityListConfig } from '../shared/reality-list/types';
import { ActivatedRoute } from '@angular/router';
import { Pagination, SearchPaginationResult } from '../shared/components/pagination/types';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RealityListComponent, PaginationComponent],
  providers: [ModalService],
  templateUrl: './my-reality.component.html',
  styleUrl: './my-reality.component.scss',
})
export class MyRealityComponent {
  private api = inject(ApiService);
  private modal = inject(ModalService);
  private route = inject(ActivatedRoute);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public config: RealityListConfig = { canDelete: true, canEdit: true };
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    lastPage: 0,
  };
  public realityList$: BehaviorSubject<Array<Reality>> = new BehaviorSubject<Array<Reality>>([]);
  ngOnInit(): void {
    this.handleLoad(this.pagination);
  }
  public onRealityChange() {
    this.handleLoad(this.pagination);
  }
  public onPageChange(pagination: Pagination) {
    this.handleLoad(pagination);
  }
  private handleLoad(pagination: Pagination) {
    this.loading$.next(true);
    this.api
      .get<SearchPaginationResult<Reality>>(
        `user/owned/${this.route.snapshot.params['id']}?limit=${pagination.itemsPerPage}&page=${pagination.currentPage}`
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
  public createReality() {
    this.modal
      .open(RealityCreateComponent, 'Přidání nové reality', undefined, {
        uuid: null,
        action: 'vytvorit',
      })
      .subscribe((res) => {
        if (res) {
          this.handleLoad(this.pagination);
        }
      });
  }
}
