import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchActiveType } from '../../../search/types';
import { RealityFilterTypeCheckbox } from '../../constants';

@Component({
  selector: 'custom-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  constructor() {}
  @Input() item!: RealityFilterTypeCheckbox;
  @Output() onChangeCheckBox = new EventEmitter<SearchActiveType>();
  onChange(event: Event) {
    console.log('event', this.item);
    const target = event.target as HTMLInputElement;
    this.item.active = target.checked;
    this.onChangeCheckBox.emit({
      active: target.checked,
      name: this.item.name,
    });
  }
}
