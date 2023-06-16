import { TestBed } from '@angular/core/testing';

import { SheetOfHospitalService } from './sheet-of-hospital.service';

describe('SheetOfHospitalService', () => {
  let service: SheetOfHospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetOfHospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
