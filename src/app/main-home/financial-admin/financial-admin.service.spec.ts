import { TestBed } from '@angular/core/testing';

import { FinancialAdminService } from './financial-admin.service';

describe('FinancialAdminService', () => {
  let service: FinancialAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
