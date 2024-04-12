import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { REAL_ESTATE_TYPE } from '../../constants';

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() public label: string = '';
  @Input() public items: Array<REAL_ESTATE_TYPE> = [];
  @Output() public onItemSelected: EventEmitter<REAL_ESTATE_TYPE> =
    new EventEmitter<REAL_ESTATE_TYPE>();

  constructor() {}
  public icon: IconDefinition = faChevronDown;
  public isOpen: boolean = false;
  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public itemSelected(item: REAL_ESTATE_TYPE) {
    this.onItemSelected.emit(item);
    this.isOpen = !this.isOpen;
  }
}
