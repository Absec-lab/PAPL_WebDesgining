import { TestBed } from '@angular/core/testing';

import { ValidatorchklistService } from './validatorchklist.service';

describe('ValidatorchklistService', () => {
  let service: ValidatorchklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorchklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
