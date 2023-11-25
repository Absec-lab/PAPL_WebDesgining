import { TestBed } from '@angular/core/testing';

import { ValidatorchecklistService } from './validatorchecklist.service';

describe('ValidatorchecklistService', () => {
  let service: ValidatorchecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorchecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
