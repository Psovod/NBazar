import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Reality } from '../../../reality-list/types';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private router = inject(Router);
  public selectedReality$: BehaviorSubject<Reality | null> = new BehaviorSubject<Reality | null>(null);
  public realityList$: BehaviorSubject<Array<Reality>> = new BehaviorSubject<Array<Reality>>([]);
  public reset = () => {
    this.selectedReality$.next(null);
    this.realityList$.next([]);
  };
  public set list(list: Array<Reality>) {
    this.realityList$.next(list);
  }
  public set selected(reality: Reality | null) {
    this.selectedReality$.next(reality);
  }

  public get list(): Array<Reality> {
    return this.realityList$.getValue();
  }
  public get id(): string | null {
    return this.selectedReality$.getValue()?.uuid || null;
  }
  public select(reality: Reality | null) {
    this.selectedReality$.next(reality);
    if (reality) {
      this.router.navigate(['/reality', reality.uuid]);
    }
  }
}
