import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../env/environment';

@Pipe({
  name: 'imagePath',
  standalone: true,
})
export class ImagePathPipe implements PipeTransform {
  transform(src: string | Array<string>): string {
    if (src === undefined || src === null) {
      return 'https://via.placeholder.com/150';
    }
    if (src.length === 0) {
      return 'https://via.placeholder.com/150';
    }
    if (Array.isArray(src)) {
      return environment.storage + src[0];
    }
    return environment.storage + src;
  }
}
