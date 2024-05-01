import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private api = inject(ApiService);
  public async upload(uuid: string, images: Array<string>): Promise<void> {
    const form = new FormData();
    form.append('uuid', uuid);
    for (const image of images) {
      if (!image.startsWith('blob:')) continue;
      const blob = await fetch(image).then((r) => r.blob());
      const filename = image.split('/').pop()! + blob.type.replace('image/', '.');
      if (image) {
        form.append('images[]', blob, filename);
      }
    }
    if (form.getAll('images[]').length === 0) return;
    try {
      await lastValueFrom(this.api.post('estate/images', form));
    } catch (error) {
      console.error('Error uploading photos:', error);
      throw new Error('Error uploading photos');
    }
  }
  public async delete(uuid: string, images: Array<string>): Promise<void> {
    await lastValueFrom(this.api.delete(`estate/images/${uuid}?images=${images.join(',')}`));
  }
}
