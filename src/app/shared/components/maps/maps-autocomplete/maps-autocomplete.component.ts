import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealityLocation } from '../../../reality-list/types';
import { RealityCreateOptions } from '../../../../reality/reality-create/types';
import { Observable } from 'rxjs';
import { RealEstateFilterCounty } from '../../../constants/real-estate.byty';
import { SearchService } from '../../../../search/services/search.service';
@Component({
  selector: 'custom-maps-autocomplete',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './maps-autocomplete.component.html',
  styleUrl: './maps-autocomplete.component.scss',
})
export class MapsAutocompleteComponent {
  @ViewChild('autocomplete') autocomplete!: ElementRef;
  @ViewChild('placePicker') placePicker!: ElementRef;
  @Input() item!: RealityCreateOptions;
  @Input() isLoading$!: Observable<boolean>;
  @Output() onPlaceSelect: EventEmitter<boolean> = new EventEmitter<boolean>();
  public inputValue: string = '';
  public valid = false;
  public touched = false;
  private search = inject(SearchService);
  ngOnInit(): void {
    this.setIncomingValue();
    google.maps.importLibrary('places').then(async () => {
      await this.init();
    });
  }

  onInput(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.touched = true;
    this.valid = (this.item?.value as RealityLocation)?.address === this.inputValue;
    if (!this.valid) {
      this.item.value = null;
    }
    this.onPlaceSelect.emit(false);
  }

  public async init(): Promise<void> {
    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete.nativeElement, {
      fields: ['place_id', 'name', 'formatted_address', 'geometry', 'address_components'],
      componentRestrictions: { country: 'cz' },
      types: ['address'],
    });
    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace();
      place.geometry?.location?.lat();
      const county: RealEstateFilterCounty = place.address_components?.find((component) =>
        component.types.includes('administrative_area_level_1')
      )?.long_name as RealEstateFilterCounty;
      if (place.geometry?.location) {
        const location: RealityLocation = {
          id: place.place_id as string,
          county: this.search.getCountyDbKey(county),
          address: place.formatted_address as string,
          short_name: place.name as string,
          zip_code:
            (place.address_components?.find((component) => component.types.includes('postal_code'))
              ?.long_name as string) || '',
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        };
        this.item.value = location;
        this.inputValue = location.address;
        this.valid = true;
        this.onPlaceSelect.emit(true);
      }
    });
  }
  private setIncomingValue(): void {
    if (this.item?.value) {
      this.inputValue = (this.item.value as RealityLocation).address;
      this.valid = true;
    }
  }
}
