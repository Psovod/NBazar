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
    const _query = data.map((item) => {
      let type = item.type.replaceAll(' ', '_').toLowerCase();
      return {
        [type]: item.filters
          .filter((filter) => filter.active)
          .map((filter) => filter.name),
      };
    });
    return _query
      .map((item) =>
        Object.entries(item)
          .map(([key, value]) => `${key}=${value.join(',')}`)
          .join('&')
      )
      .join('&');
  }
}
