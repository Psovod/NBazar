import { TestBed } from '@angular/core/testing';

import { RealityCreateService } from './reality-create.service';

describe('RealityCreateService', () => {
  let service: RealityCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealityCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
