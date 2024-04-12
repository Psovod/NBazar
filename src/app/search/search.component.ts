import { Component } from '@angular/core';
import { CheckboxComponent } from '../shared/components/checkbox/checkbox.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { Subscription } from 'rxjs';
import {
  REAL_ESTATE,
  REAL_ESTATE_OBJECT,
  REAL_ESTATE_TYPE,
  RealityFilterTypeList,
} from '../shared/constants';
import { CommonModule } from '@angular/common';
import { SearchActiveType } from './types';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    DropdownComponent,
    FontAwesomeModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.query = params['query'];
      this.setFilterType(this.query);
    });
  }
  private routeSubscription: Subscription;
  public activeType: Array<SearchActiveType> = [
    {
      active: true,
      name: 'Prodej',
    },
    {
      active: false,
      name: 'Pronájem',
    },
  ];

  public activeBuy: boolean = false;
  public activeSell: boolean = false;
  public query: REAL_ESTATE_TYPE = REAL_ESTATE_TYPE.BYTY;
  public dropDownItems: Array<REAL_ESTATE_TYPE> = REAL_ESTATE.map(
    (item) => item.name
  );
  public activeFilters: Array<RealityFilterTypeList> = [];
  public iconDown: IconDefinition = faChevronDown;
  ngOnInit(): void {}
  onCheckboxChange(event: SearchActiveType) {}
  onItemSelected(item: REAL_ESTATE_TYPE) {
    this.router.navigate(['/hledej', item]);
  }
  public async search() {
    const query = this.searchService.query(this.activeFilters);
    this.router.navigate(['/hledej', this.query, query]);
  }
  onTypeClick(type: SearchActiveType) {
    this.activeType = this.activeType.map((item) => ({
      name: item.name,
      active: item.name === type.name,
    }));
  }
  private setFilterType(type: REAL_ESTATE_TYPE) {
    this.activeFilters = [];
    REAL_ESTATE_OBJECT[type].filters.forEach((filter) => {
      console.log(filter.name === 'cena');
      this.activeFilters.push({
        type: filter.name,
        filters: filter.values.map((value) => ({
          name: value,
          active: false,
        })),
      });
    });
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
