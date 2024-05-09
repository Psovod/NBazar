import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { lastValueFrom } from 'rxjs';
import { RealityFilterTypeList } from '../types';
import { Reality } from '../../shared/reality-list/types';
import { SearchPaginationResult } from '../../shared/components/pagination/types';
import { REAL_ESTATE_FILTER_COUNTY_ARRAY, RealEstateFilterCounty } from '../../shared/constants/real-estate.byty';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private api = inject(ApiService);
  public query(data: Array<RealityFilterTypeList>): string {
    return this.getSearchResults(data);
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
  private getSearchResults(data: Array<RealityFilterTypeList>) {
    const _query = data.flatMap((item) => {
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
    return _query.join('&');
  }
}
