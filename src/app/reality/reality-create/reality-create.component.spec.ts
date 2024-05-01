import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealityCreateComponent } from './reality-create.component';

describe('RealityCreateComponent', () => {
  let component: RealityCreateComponent;
  let fixture: ComponentFixture<RealityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealityCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
