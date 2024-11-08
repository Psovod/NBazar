import { Pipe, PipeTransform } from '@angular/core';
import { RealityLocation } from '../../../shared/reality-list/types';

@Pipe({
  name: 'realityLocation',
  standalone: true,
})
export class RealityLocationPipe implements PipeTransform {
  transform(location: RealityLocation): string {
    return `${location.address}`;
  }
}
