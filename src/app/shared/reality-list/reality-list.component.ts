import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Subject, take } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RealityLocationPipe } from '../../search/search-result/pipes/reality-location.pipe';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import { RealityCreateComponent } from '../../reality/reality-create/reality-create.component';
import { RealityCreateFormValues } from '../../reality/reality-create/types';
import { Reality, RealityListConfig } from './types';
import { ApiService } from '../api/api.service';
import { ImagePathPipe } from '../pipes/image-path.pipe';
import { ConfirmComponent } from '../components/confirm-delete/confirm.component';
import { RealityNamePipe } from '../../reality/pipes/reality-name.pipe';

@Component({
  selector: 'reality-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RealityLocationPipe, RealityNamePipe, ImagePathPipe],
  providers: [ModalService],
  templateUrl: './reality-list.component.html',
  styleUrl: './reality-list.component.scss',
})
export class RealityListComponent {
  @Input() public loading$: Subject<boolean> = new Subject<boolean>();
  @Input() public realityList: Array<Reality> | null = [];
  @Input() public config: RealityListConfig = {
    canDelete: false,
    canEdit: false,
    canFavorite: false,
    canShowReport: false,
  };
  @Output() public onRealityChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private modal = inject(ModalService);
  private router = inject(Router);
  private api = inject(ApiService);

  public removeFavorite(uuid: string) {
    this.api
      .post<boolean>('user/favorite', { uuid })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.realityList = this.realityList?.filter((reality) => reality.uuid !== uuid) as Array<Reality>;
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
  public openReality(id: string) {
    this.router.navigate([`/reality/${id}`]);
  }
  public deleteReality(id: string) {
    this.modal
      .open<ConfirmComponent, boolean>(ConfirmComponent, 'Potvrdtě smazání reality', {
        input: id,
        message: 'smazat',
      })
      .subscribe((res) => {
        if (res) {
          this.api
            .delete<boolean>(`estate/${id}`)
            .pipe(take(1))
            .subscribe({
              next: (res) => {
                this.realityList = this.realityList?.filter((reality) => reality.uuid !== id) as Array<Reality>;
              },
              error: (err) => {
                throw new Error(err);
              },
            });
        }
      });
  }
  public editReality(reality: Reality): void {
    this.api
      .get<Reality>(`estate/patch/${reality.uuid}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.modal
            .open(RealityCreateComponent, 'Úprava reality ', this.createRealityFormValues(res), {
              uuid: res.uuid,
              action: 'upravit',
            })
            .pipe(take(1))
            .subscribe({
              next: (res) => {
                if (res) {
                  this.onRealityChange.emit(true);
                }
              },
              error: (err) => {
                throw new Error(err);
              },
            });
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
  private createRealityFormValues(reality: Reality): Array<RealityCreateFormValues> {
    return Object.entries(reality).map(([key, value]) => {
      return {
        name: key,
        value: value,
      };
    });
  }
}
