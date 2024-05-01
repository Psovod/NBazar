import { Pipe, PipeTransform } from '@angular/core';
import { REAL_ESTATE_TYPE } from '../../shared/constants';
import { Reality } from '../../shared/reality-list/types';

@Pipe({
  name: 'realityName',
  standalone: true,
})
export class RealityNamePipe implements PipeTransform {
  transform(value: Reality): string {
    return `${this.convertTransactionType(value.transaction_type)} ${this.convertType(value.type)} ${value.sub_type} ${
      value.area
    } m²`;
  }
  private convertTransactionType(transactionType: number): 'Prodej' | 'Pronájem' {
    return transactionType === 1 ? 'Prodej' : 'Pronájem';
  }
  private convertType(type: REAL_ESTATE_TYPE): string {
    switch (type) {
      case REAL_ESTATE_TYPE.BYTY:
        return 'Bytu';
      case REAL_ESTATE_TYPE.DOMY:
        return 'Domu';
      case REAL_ESTATE_TYPE.KOMERCNI:
        return 'Komerční';
      case REAL_ESTATE_TYPE.POZEMKY:
        return 'Pozemeku';
      case REAL_ESTATE_TYPE.OSTATNI:
        return 'Ostatní';

      default:
        return 'Neznámý';
    }
  }
}
