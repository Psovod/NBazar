import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RealityFilterHTMLType, SearchActiveType } from '../../../search/types';

@Component({
  selector: 'custom-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  constructor() {}
  @Input() item!: RealityFilterHTMLType;
  @Output() onChangeCheckBox = new EventEmitter<SearchActiveType>();
  onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.item.active = target.checked;
    this.onChangeCheckBox.emit({
      active: target.checked,
      name: this.item.name,
    });
  }
}
