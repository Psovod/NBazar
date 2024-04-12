import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private dialogRef: ComponentRef<any> | null = null;
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  open<T>(
    component: Type<T>,
    title: string,
    content: string
  ): Observable<boolean> {
    this.dialogRef = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.dialogRef.instance.dialogRef = this.dialogRef;
    this.dialogRef.instance.title = title;
    this.dialogRef.instance.content = content;

    document.body.appendChild(this.dialogRef.location.nativeElement);

    this.appRef.attachView(this.dialogRef.hostView);

    return this.dialogRef.instance.outputEvent;
  }
}
