import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealityComponent } from './reality.component';

describe('RealityComponent', () => {
  let component: RealityComponent;
  let fixture: ComponentFixture<RealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
