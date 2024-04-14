import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RealityFilterTypeCheckbox } from '../../constants';

@Component({
  selector: 'custom-range',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './range.component.html',
  styleUrl: './range.component.scss',
})
export class RangeComponent {
  // Existing code...
  @Input() public item!: RealityFilterTypeCheckbox;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.item);
  }

  public form: FormGroup = new FormGroup({
    od: new FormControl('', [Validators.min(0)]),
    do: new FormControl('', [Validators.min(1)]),
  });
  constructor(private formBuilder: FormBuilder) {}
  public onRangeChange: EventEmitter<any> = new EventEmitter();
  // Function to handle form submission
  onSubmit() {
    // Do something with the range value
    console.log(this.form.value);
  }
}
