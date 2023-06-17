import { TestBed } from '@angular/core/testing';

import { TasksAutoMatchedService } from './tasks-auto-matched.service';

describe('TasksAutoMatchedService', () => {
  let service: TasksAutoMatchedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksAutoMatchedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
