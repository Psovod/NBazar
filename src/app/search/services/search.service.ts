import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { RealityFilterTypeList } from '../../shared/constants';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private api: ApiService) {}
  private searchResults: Array<any> = [];
  public query(data: Array<RealityFilterTypeList>): string {
    return this.getSearchResults(data);
  }
  public async search(query: string, filters: string) {
    return await lastValueFrom(
      this.api.get(`search?reality=${query}&${filters}`)
    );
  }

  private getSearchResults(data: Array<RealityFilterTypeList>) {
    const _query = data.flatMap((item) => {
      return Object.entries({
        [item.type]: item.filters
          .filter((filter) => filter.active)
          .map((filter) => filter.searchIndex),
      })
        .filter(([key, value]) => value.length > 0) // filter out entries with no value
        .map(
          ([key, value]) =>
            `${this.removeDiacritics(key)
              .replaceAll(' ', '_')
              .toLocaleLowerCase()}=${value.join(',')}`
        );
    });
    return '?' + _query.join('&');
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

function remove() {
  throw new Error('Function not implemented.');
}
