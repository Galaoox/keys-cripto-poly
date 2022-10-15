import { TestBed } from '@angular/core/testing';

import { TasksContractService } from './tasks-contract.service';

describe('TasksContractService', () => {
  let service: TasksContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
