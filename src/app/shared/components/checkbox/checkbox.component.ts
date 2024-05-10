import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RealityFilterHTMLType, TransactionType } from '../../../search/types';
import { RealityCreateOptions } from '../../../reality/reality-create/types';

@Component({
  selector: 'custom-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  constructor() {}
  @Input() option!: RealityFilterHTMLType;
  @Input() item!: RealityCreateOptions;
  @Output() onChangeCheckBox = new EventEmitter<TransactionType>();
  ngOnInit(): void {
    if (this.item === undefined) return;
    if (this.item.value) {
      this.option.active = (this.item.value as unknown as Array<number>).includes(this.option.value as number);
    }
  }
  onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.option.active = target.checked;
    console.log(this.option.value);
    this.onChangeCheckBox.emit({
      active: target.checked,
      name: this.option.name,
      dbKey: this.option.value as number,
    });
  }
}
