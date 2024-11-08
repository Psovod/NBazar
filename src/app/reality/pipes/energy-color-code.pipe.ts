import { Pipe, PipeTransform } from '@angular/core';
import { RealEstateEnergyConsumption } from '../../shared/constants/real-estate.byty';

@Pipe({
  name: 'energyColorCode',
  standalone: true,
})
export class EnergyColorCodePipe implements PipeTransform {
  transform(value: RealEstateEnergyConsumption): string {
    let color = '';
    switch (value) {
      case 'A - Mimořádně úsporná':
        color = 'bg-green-600';
        break;
      case 'B - Velmi úsporná':
        color = 'bg-green-500';
        break;
      case 'C - Úsporná':
        color = 'bg-lime-500';
        break;
      case 'D - Méně úsporná':
        color = 'bg-yellow-300';
        break;
      case 'E - Nehospodárná':
        color = 'bg-yellow-500';
        break;
      case 'F - Velmi nehospodárná':
        color = 'bg-orange-500';
        break;
      case 'G - Mimořádně nehospodárná':
        color = 'bg-red-600';
        break;
      default:
        break;
    }
    return color;
  }
}
