import { ApplicationRef, Component, ComponentRef, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ConfirmConfig } from './types';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public dialogRef: ComponentRef<ConfirmComponent> | null = null;
  public title!: string;
  public content!: ConfirmConfig;
  public closeIcon: IconDefinition = faClose;
  public input: string = '';
  private appRef = inject(ApplicationRef);
  public close(): void {
    this.outputEvent.emit(false);
    this.appRef.detachView(this.dialogRef?.hostView as any);
    this.dialogRef?.destroy();
  }
  public confirm(): void {
    this.outputEvent.emit(true);
    this.appRef.detachView(this.dialogRef?.hostView as any);
    this.dialogRef?.destroy();
  }
}
