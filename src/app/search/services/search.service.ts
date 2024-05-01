import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { lastValueFrom } from 'rxjs';
import { RealityFilterTypeList, SearchPaginateRealityList } from '../types';
import { Reality } from '../../shared/reality-list/types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private api: ApiService) {}
  private searchResults: Array<Reality> = [];
  public query(data: Array<RealityFilterTypeList>): string {
    return this.getSearchResults(data);
  }
  public async search(query: number, filters: string, limit: number, page: number): Promise<SearchPaginateRealityList> {
    return await lastValueFrom(
      this.api.get<SearchPaginateRealityList>(`estates/search?type=${query}&${filters}&limit=${limit}&page=${page}`)
    );
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
}
