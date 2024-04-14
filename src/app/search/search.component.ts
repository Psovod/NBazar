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
import { RangeComponent } from '../shared/components/range/range.component';
import { REAL_ESTATE_FILTER_INPUT_TYPE } from '../shared/constants/realestate.byty';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckboxComponent,
    DropdownComponent,
    RangeComponent,
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
  ngOnInit(): void {
    this.onTypeClick(this.activeType[0]);
  }
  onCheckboxChange(event: SearchActiveType) {}
  onItemSelected(item: REAL_ESTATE_TYPE) {
    this.router.navigate(['/hledej', item]);
  }
  public async search() {
    const query = this.searchService.query(this.activeFilters);
    const type = this.searchService
      .removeDiacritics(this.query)
      .replaceAll(' ', '_')
      .toLocaleLowerCase();
    console.log(this.activeFilters);
    // await this.router.navigate(['/hledej', type, query]);
  }
  onTypeClick(type: SearchActiveType) {
    this.activeType = this.activeType.map((item) => ({
      name: item.name,
      active: item.name === type.name,
    }));
    if (this.query === REAL_ESTATE_TYPE.BYTY && type.name === 'Prodej') {
      //filter 'typ' 'pokoj' from activeFilters
      this.activeFilters = this.activeFilters.map((filter) => {
        if (filter.type === 'typ') {
          filter.filters = filter.filters.filter(
            (item) => item.name !== 'pokoj'
          );
        }
        if (filter.type === 'vybavení') {
          filter.hidden = true;
          filter.filters = filter.filters.map((item) => ({
            ...item,
            active: false,
          }));
        }
        return filter;
      });
    }
    if (this.query === REAL_ESTATE_TYPE.BYTY && type.name === 'Pronájem') {
      this.activeFilters = this.activeFilters.map((filter) => {
        if (filter.type === 'typ') {
          const pokojExists = filter.filters.some((f) => f.name === 'pokoj');

          if (!pokojExists) {
            filter.filters.unshift({
              name: 'pokoj',
              active: false,
              searchIndex: 1,
            });
          }
        }
        if (filter.type === 'vybavení') {
          filter.hidden = false;
        }
        return filter;
      });
    }
  }
  private setFilterType(type: REAL_ESTATE_TYPE) {
    this.activeFilters = [];
    this.query = type;
    REAL_ESTATE_OBJECT[type].filters.forEach((filter) => {
      let filters;
      switch (filter.values.type) {
        case REAL_ESTATE_FILTER_INPUT_TYPE.RANGE:
          filters = filter.values.array.map((value: any, index: number) => ({
            name: value,
            value: null,
          }));
          break;
        case REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN:
          filters = [
            {
              name: filter.name,
              value: filter.values.array[0],
              options: filter.values.array,
            },
          ];
          break;
        default:
          filters = filter.values.array.map((value: any, index: number) => ({
            name: value,
            active: false,
            searchIndex: index + 1,
          }));
          break;
      }
      this.activeFilters.push({
        type: filter.name,
        hidden: false,
        inputType: filter.values.type,
        filters: filters,
      });
    });
    console.log(this.activeFilters);
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
