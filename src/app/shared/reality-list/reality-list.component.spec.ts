import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealityListComponent } from './reality-list.component';

describe('RealityListComponent', () => {
  let component: RealityListComponent;
  let fixture: ComponentFixture<RealityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
