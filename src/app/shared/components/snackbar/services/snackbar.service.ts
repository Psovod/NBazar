import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { SnackbarComponent } from '../snackbar.component';
import { SnackBarColor } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBarRefArray: ComponentRef<SnackbarComponent>[] = [];

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {}

  public open(message: string, color: SnackBarColor, timeout: number = 5000): void {
    const snackbarRef = createComponent(SnackbarComponent, {
      environmentInjector: this.injector,
    });
    this.snackBarRefArray.push(snackbarRef);
    snackbarRef.instance.snackbarRef = snackbarRef;
    snackbarRef.instance.message = message;
    snackbarRef.instance.color = color;

    this.updateSnackbarPositions();

    document.body.appendChild(snackbarRef.location.nativeElement);
    this.appRef.attachView(snackbarRef.hostView);

    setTimeout(() => {
      this.destroy(snackbarRef);
    }, timeout);
  }

  public destroy(snackbarRef: ComponentRef<SnackbarComponent>): void {
    const index = this.snackBarRefArray.indexOf(snackbarRef);
    if (index > -1) {
      this.snackBarRefArray.splice(index, 1);
    }
    snackbarRef.destroy();
    this.updateSnackbarPositions();
  }

  private updateSnackbarPositions(): void {
    const gap = 30;
    let offset = 10;
    this.snackBarRefArray.forEach((ref, index) => {
      ref.instance.offset = offset;
      offset += ref.location.nativeElement.offsetHeight + gap;
    });
  }
}
