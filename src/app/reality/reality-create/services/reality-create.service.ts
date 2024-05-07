import { Injectable, inject } from '@angular/core';
import { RealityCreateFormValues, RealityCreateOptionsSteps } from '../types';
import { REAL_ESTATE_TYPE } from '../../../shared/constants';
import {
  realityCreateSizeType,
  selectTypeArray,
} from '../../../shared/constants/reality-create/real-estate.create-form';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../../shared/api/api.service';
import { ImagesService } from '../../../shared/upload/images.service';

@Injectable({
  providedIn: 'root',
})
export class RealityCreateService {
  private api = inject(ApiService);
  private images = inject(ImagesService);
  private removeImage: Array<string> = [];
  public onRemoveImage(images: Array<string>) {
    this.removeImage = images;
  }
  public convertToRealityFormData(
    input: Array<RealityCreateFormValues>,
    steps: Array<RealityCreateOptionsSteps>
  ): Array<RealityCreateOptionsSteps> {
    const _steps = structuredClone(steps).map((step) => {
      const categoryIndex = step.field.findIndex((field) => field.dbKey === 'type');
      if (categoryIndex !== -1) {
        const category = input.find((field) => field.name === 'type');
        step.field.splice(categoryIndex + 1, 0, selectTypeArray(category?.value as REAL_ESTATE_TYPE));
      }
      const subTypeIndex = step.field.findIndex((field) => field.dbKey === 'sub_type');
      if (subTypeIndex !== -1) {
        step.field.splice(subTypeIndex + 1, 0, realityCreateSizeType);
      }

      return {
        ...step,
        field: step.field.map((field) => {
          const value = input.find((el) => el.name === field.dbKey)?.value;
          if (value !== undefined) {
            field.value = value;
            return {
              ...field,
            };
          } else {
            return field;
          }
        }),
      };
    });
    return _steps;
  }
  // public convertToRealityFormData(
  //   input: Array<RealityCreateFormValues>,
  //   steps: Array<RealityCreateOptionsSteps>
  // ): void {
  //   // Create a map for quick lookup of input values by name
  //   const inputMap = new Map(input.map((i) => [i.name, i.value]));

  //   steps.map((step) => {
  //     const categoryIndex = step.field.findIndex((field) => field.dbKey === 'type');
  //     if (categoryIndex !== -1) {
  //       const category = inputMap.get('type');
  //       step.field.splice(categoryIndex + 1, 0, selectTypeArray(category as REAL_ESTATE_TYPE));
  //     }

  //     const subTypeIndex = step.field.findIndex((field) => field.dbKey === 'sub_type');
  //     if (subTypeIndex !== -1) {
  //       step.field.splice(subTypeIndex + 1, 0, realityCreateSizeType);
  //     }

  //     return {
  //       ...step,
  //       field: step.field.forEach((field) => {
  //         // Exclude 'type' and 'sub_type' from being updated
  //         if (field.dbKey !== 'type' && field.dbKey !== 'sub_type') {
  //           // Update the value from the input map if it exists, otherwise leave it unchanged
  //           if (inputMap.has(field.dbKey)) {
  //             field.value = inputMap.get(field.dbKey);
  //           }
  //         }
  //       }),
  //     };
  //   });
  // }
  public dataForm(steps: Array<RealityCreateOptionsSteps>): Array<RealityCreateFormValues> {
    return steps
      .map((step) => step.field)
      .reduce((acc, val) => acc.concat(val), [])
      .map((field) => {
        return {
          name: field.dbKey,
          value: field.value,
        };
      });
  }
  public findIndexOfEnum(value: string): string | undefined {
    return Object.values(REAL_ESTATE_TYPE).find((val, index) => index === Number(value) - 1);
  }
  public async updateReality(uuid: string | null, data: Array<RealityCreateFormValues>): Promise<void> {
    if (uuid !== null) {
      await lastValueFrom(this.api.patch<boolean>(`estate/${uuid}`, data));
      if (this.removeImage.length > 0) {
        await this.images.delete(uuid, this.removeImage);
      }
      await this.images.upload(uuid, data.find((el) => el.name === 'images')?.value as Array<string>);
    } else {
      const id = await lastValueFrom(this.api.post<string>(`estate`, data));
      await this.images.upload(id, data.find((el) => el.name === 'images')?.value as Array<string>);
    }
  }
}
