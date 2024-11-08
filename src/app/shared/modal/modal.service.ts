import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Type, createComponent } from '@angular/core';
import { Observable } from 'rxjs';
import { RealityCreateConfig } from '../../reality/reality-create/types';

@Injectable()
export class ModalService {
  private dialogRef: ComponentRef<any> | null = null;
  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {}

  open<T, R>(component: Type<T>, title: string, content?: any, config?: RealityCreateConfig): Observable<R> {
    this.dialogRef = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.dialogRef.instance.dialogRef = this.dialogRef;
    this.dialogRef.instance.title = title;
    this.dialogRef.instance.content = content;
    this.dialogRef.instance.config = config;

    document.body.appendChild(this.dialogRef.location.nativeElement);

    this.appRef.attachView(this.dialogRef.hostView);

    return this.dialogRef.instance.outputEvent;
  }
}
