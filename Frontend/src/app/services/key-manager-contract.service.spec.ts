import { TestBed } from '@angular/core/testing';

import { KeyManagerContractService } from './key-manager-contract.service';

describe('KeyManagerContractService', () => {
  let service: KeyManagerContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyManagerContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
