import { Component, ComponentRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SnackBarColor } from './types';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  @Input() color!: SnackBarColor;
  @Input() message!: string;
  @Input() snackbarRef!: ComponentRef<SnackbarComponent>;
  @Input() offset = 0; // Added to control the offset dynamically

  public closeIcon = faClose;
  private snackbar = inject(SnackbarService);

  close(): void {
    this.snackbar.destroy(this.snackbarRef);
  }
}
