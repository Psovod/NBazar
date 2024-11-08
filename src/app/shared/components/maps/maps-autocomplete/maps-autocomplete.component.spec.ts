import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsAutocompleteComponent } from './maps-autocomplete.component';

describe('MapsAutocompleteComponent', () => {
  let component: MapsAutocompleteComponent;
  let fixture: ComponentFixture<MapsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
