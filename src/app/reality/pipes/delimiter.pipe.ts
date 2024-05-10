import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delimiter',
  standalone: true,
})
export class DelimiterPipe implements PipeTransform {
  transform(items: Array<string>, delimiter: string): Array<string> {
    return items.map((item, index) => (index < items.length - 1 ? item + delimiter : item));
  }
}
