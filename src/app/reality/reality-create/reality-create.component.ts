import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, ComponentRef, EventEmitter, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { REAL_ESTATE_TYPE } from '../../shared/constants';
import { FormsModule } from '@angular/forms';
import { RealityCreateConfig, RealityCreateFormValues, RealityCreateOptions, RealityCreateOptionsSteps } from './types';
import {
  realityCreateOptionsSteps,
  realityCreateSizeType,
  selectTypeArray,
} from '../../shared/constants/reality-create/real-estate.create-form';
import { Subject } from 'rxjs';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { TransactionType } from '../../search/types';
import { RealityCreateService } from './services/reality-create.service';
import { MapsAutocompleteComponent } from '../../shared/components/maps/maps-autocomplete/maps-autocomplete.component';
import { RealityLocation } from '../../shared/reality-list/types';

@Component({
  selector: 'app-reality-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadComponent,
    FontAwesomeModule,
    CheckboxComponent,
    MapsAutocompleteComponent,
  ],
  templateUrl: './reality-create.component.html',
  styleUrl: './reality-create.component.scss',
})
export class RealityCreateComponent {
  public reality = inject(RealityCreateService);
  constructor(private appRef: ApplicationRef) {}
  public isLoading$: Subject<boolean> = new Subject<boolean>();
  public isError$: Subject<boolean> = new Subject<boolean>();
  public icons: Array<IconDefinition> = [faCheck, faClose];
  public selectedStepIndex: number = 0;
  public content!: Array<RealityCreateFormValues>;
  public config: RealityCreateConfig = { uuid: null, action: 'vytvorit' };
  public title!: string;
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public dialogRef: ComponentRef<RealityCreateComponent> | null = null;
  public realityCreateOptionsSteps: Array<RealityCreateOptionsSteps> = structuredClone(realityCreateOptionsSteps);
  async ngOnInit(): Promise<void> {
    this.reset();
    if (this.content) {
      this.realityCreateOptionsSteps = this.reality.convertToRealityFormData(
        this.content,
        this.realityCreateOptionsSteps
      );
      this.init();
    }
  }
  get isFormValid(): boolean {
    return this.realityCreateOptionsSteps.every((step) => step.valid);
  }

  public close(): void {
    if (this.dialogRef) {
      this.appRef.attachView(this.dialogRef.hostView);
      this.dialogRef.destroy();
    }
  }
  public async nextStep(): Promise<void> {
    if (this.selectedStepIndex === this.realityCreateOptionsSteps.length - 1) {
      this.isLoading$.next(true);
      if (!this.isValid()) {
        return this.isLoading$.next(false);
      }
      this.reality
        .updateReality(this.config?.uuid, this.reality.dataForm(this.realityCreateOptionsSteps))
        .then(() => {
          this.isLoading$.next(false);
          this.isError$.next(false);
          this.outputEvent.emit(true);
          this.close();
        })
        .catch(() => {
          this.isLoading$.next(false);
          this.isError$.next(true);
        });
      return;
    }
    if (this.selectedStepIndex < this.realityCreateOptionsSteps.length - 1) {
      this.selectedStepIndex++;
    }
  }
  public previousStep(): void {
    if (this.selectedStepIndex > 0) {
      this.selectedStepIndex--;
    }
  }
  public changeCheckBox(event: TransactionType, item: RealityCreateOptions, option: RealityCreateFormValues): void {
    if (event.active) {
      if (item.value instanceof Array) {
        item.value.push(option.value);
        item.value.filter((val) => val !== option.value);
      } else {
        item.value = [option.value];
      }
    } else if (item.value instanceof Array) {
      item.value = item.value.filter((val) => val !== option.value);
    }
  }

  public validateField(selected: RealityCreateOptionsSteps): void {
    const categoryIndex = selected.field.findIndex((field) => field.dbKey === 'type');
    const category = selected.field.find((field) => field.dbKey === 'type');
    selected.field = selected.field.filter((field) => field.dbKey !== 'sub_type' && field.dbKey !== 'room_type');
    if (category?.value) {
      switch (this.reality.findIndexOfEnum(category?.value as string)) {
        case REAL_ESTATE_TYPE.BYTY:
          selected.field.splice(
            categoryIndex + 1,
            0,
            selectTypeArray(this.reality.findIndexOfEnum(category.value as string) as REAL_ESTATE_TYPE)
          );
          break;
        case REAL_ESTATE_TYPE.DOMY:
          selected.field.splice(
            categoryIndex + 1,
            0,
            selectTypeArray(this.reality.findIndexOfEnum(category.value as string) as REAL_ESTATE_TYPE)
          );
          const subTypeIndex = selected.field.findIndex((field) => field.dbKey === 'sub_type');
          selected.field.splice(subTypeIndex + 1, 0, realityCreateSizeType);
          break;

        default:
          selected.field.splice(
            categoryIndex + 1,
            0,
            selectTypeArray(this.reality.findIndexOfEnum(category.value as string) as REAL_ESTATE_TYPE)
          );
          break;
      }
    }
    selected.valid = selected.field.every((field) => {
      if (field.dbKey !== 'additional_equipment') {
        return field.value !== '' && field.value !== null;
      } else {
        return true;
      }
    });
  }
  private reset(): void {
    this.realityCreateOptionsSteps.forEach((step) => {
      step.field.forEach((field) => {
        field.value = '';
      });
    });
  }
  private init() {
    this.realityCreateOptionsSteps.forEach((step) => {
      this.validateField(step);
    });
  }
  private isValid(): boolean {
    return this.realityCreateOptionsSteps.every((step) => step.valid);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
