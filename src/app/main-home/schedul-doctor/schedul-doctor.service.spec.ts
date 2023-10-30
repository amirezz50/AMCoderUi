import { TestBed } from '@angular/core/testing';

import { SchedulDoctorService } from './schedul-doctor.service';

describe('SchedulDoctorService', () => {
  let service: SchedulDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
