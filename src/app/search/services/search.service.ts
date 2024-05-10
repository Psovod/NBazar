import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { lastValueFrom } from 'rxjs';
import { RealityFilterHTMLType, RealityFilterTypeList, TransactionType } from '../types';
import { Reality } from '../../shared/reality-list/types';
import { SearchPaginationResult } from '../../shared/components/pagination/types';
import { REAL_ESTATE_FILTER_COUNTY_ARRAY, RealEstateFilterCounty } from '../../shared/constants/real-estate.byty';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private api = inject(ApiService);
  public query(data: Array<RealityFilterTypeList>, transaction_type: TransactionType): string {
    return this.getSearchResults(data, transaction_type);
  }
  public async search(
    type: number,
    query: string,
    limit: number,
    page: number
  ): Promise<SearchPaginationResult<Reality>> {
    return await lastValueFrom(
      this.api.get<SearchPaginationResult<Reality>>(`estates/search?type=${type}&${query}&limit=${limit}&page=${page}`)
    );
  }
  public getCountyDbKey(county: RealEstateFilterCounty): number {
    const array = REAL_ESTATE_FILTER_COUNTY_ARRAY;
    return array.findIndex((item) => item === county) + 1;
  }
  public async searchCount(type: number, query: string): Promise<number> {
    return await lastValueFrom(this.api.get<number>(`estates/search/count?type=${type}&${query}`));
  }
  public removeDiacritics(value: string): string {
    const diacritics: { [index: string]: string } = {
      á: 'a',
      č: 'c',
      ď: 'd',
      é: 'e',
      ě: 'e',
      í: 'i',
      ň: 'n',
      ó: 'o',
      ř: 'r',
      š: 's',
      ť: 't',
      ú: 'u',
      ů: 'u',
      ý: 'y',
      ž: 'z',
    };

    return value
      .split('')
      .map((char) => diacritics[char] || char)
      .join('');
  }
  private getSearchResults(data: Array<RealityFilterTypeList>, transaction_type: TransactionType): string {
    const _data = structuredClone(data);
    const _query = _data.flatMap((item) => {
      if (item.dbKey === 'price' || item.dbKey === 'area' || item.dbKey === 'floor') {
        this.setDefaultFilterValues(item.filters);
      }
      return Object.entries({
        [item.dbKey]: item.filters
          .filter((filter) => filter.active || filter.value)
          .map((filter) => (filter.searchIndex ? filter.searchIndex : filter.value)),
      })
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => {
          return `${this.removeDiacritics(key).replaceAll(' ', '_').toLocaleLowerCase()}=${value.join(',')}`;
        });
    });
    return _query.join('&') + `&transaction_type=${transaction_type.dbKey}`;
  }
  private setDefaultFilterValues(data: Array<RealityFilterHTMLType>): Array<RealityFilterHTMLType> {
    const from = data.find((filter) => filter.name === 'od');
    const to = data.find((filter) => filter.name === 'do');
    if (from?.value === null && to?.value === null) return data;

    if (from && !from.value) {
      from.value = 0;
    }
    if (to && !to.value) {
      to.value = 1000000000;
    }
    return data;
  }
}
