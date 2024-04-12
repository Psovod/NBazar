import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ComponentRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCheckCircle,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reality-create',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reality-create.component.html',
  styleUrl: './reality-create.component.scss',
})
export class RealityCreateComponent {
  constructor(private appRef: ApplicationRef) {}
  public closeIcon: IconDefinition = faClose;
  public check: IconDefinition = faCheck;
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public dialogRef: ComponentRef<RealityCreateComponent> | null = null;
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
