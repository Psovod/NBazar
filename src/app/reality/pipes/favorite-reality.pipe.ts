import { Pipe, PipeTransform, inject } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Pipe({
  name: 'favoriteReality',
  standalone: true,
})
export class FavoriteRealityPipe implements PipeTransform {
  private auth = inject(AuthService);
  transform(id: string, changeEvent: boolean): boolean {
    return this.auth.user?.watched_estates?.includes(id) ?? false;
  }
}
