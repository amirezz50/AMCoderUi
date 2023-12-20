import { TestBed } from '@angular/core/testing';

import { ProceduresManageService } from './procedures-manage.service';

describe('ProceduresManageService', () => {
  let service: ProceduresManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProceduresManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
