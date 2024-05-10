import { Component, inject } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MapsComponent } from '../../shared/components/maps/maps.component';
import { REAL_ESTATE_TYPE } from '../../shared/constants';
import { RealityLocationPipe } from './pipes/reality-location.pipe';
import { MapsService } from '../../shared/components/maps/services/maps.service';
import { Reality } from '../../shared/reality-list/types';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Pagination } from '../../shared/components/pagination/types';
import { RealityNamePipe } from '../../reality/pipes/reality-name.pipe';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    MapsComponent,
    RealityLocationPipe,
    RealityNamePipe,
    ImagePathPipe,
    PaginationComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  public searchResults$: BehaviorSubject<Array<Reality>> = new BehaviorSubject<Array<Reality>>([]);
  public maps = inject(MapsService);
  public query: string = '';
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private search = inject(SearchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private filter: string = '';
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    lastPage: 0,
  };
  constructor() {
    this.route.params.subscribe(async (params) => {
      this.query = params['query'];
      this.filter = params['filters'];
      const searchParams = new URLSearchParams(this.filter);
      let transactionType: string | null = searchParams.get('transaction_type');
      if (transactionType === '0') {
        transactionType = 'Pronájem';
      } else {
        transactionType = 'Prodej';
      }
      this.query = `${transactionType} ${this.query}`;
      this.maps.reset();
      await this.handleSearch(this.pagination);
    });
  }

  onPageChange(pagination: Pagination) {
    this.handleSearch(pagination);
  }

  async ngAfterViewInit(): Promise<void> {
    await this.init();
  }

  async init() {}
  viewProperty(id: string) {
    this.maps.select(this.maps.list.find((reality) => reality.uuid === id) || null);
    this.router.navigate(['/reality', id || 'test']);
  }
  private async handleSearch(pagination: Pagination): Promise<void> {
    this.loading$.next(true);
    const index =
      Object.values(REAL_ESTATE_TYPE).findIndex((item) => {
        return item === this.query;
      }) + 1;
    const { data, total, lastPage } = await this.search.search(
      index,
      this.filter,
      pagination.itemsPerPage,
      pagination.currentPage
    );
    this.searchResults$.next(data);
    this.maps.list = data;
    pagination.totalItems = total;
    pagination.lastPage = lastPage;
    this.loading$.next(false);
  }
}
