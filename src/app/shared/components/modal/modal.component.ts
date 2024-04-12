import {
  ApplicationRef,
  Component,
  ComponentRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(private appRef: ApplicationRef) {}
  public closeIcon: IconDefinition = faClose;
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public dialogRef: ComponentRef<ModalComponent> | null = null;
  public close(): void {
    this.outputEvent.emit(true);
    if (this.dialogRef) {
      this.appRef.attachView(this.dialogRef.hostView);
      this.dialogRef.destroy();
    }
  }
  public title: string = '';
  public content: string = '';
}
