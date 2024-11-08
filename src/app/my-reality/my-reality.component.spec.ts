import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRealityComponent } from './my-reality.component';

describe('UserComponent', () => {
  let component: MyRealityComponent;
  let fixture: ComponentFixture<MyRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRealityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
