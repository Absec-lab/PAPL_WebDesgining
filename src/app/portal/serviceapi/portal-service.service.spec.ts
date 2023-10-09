import { TestBed } from '@angular/core/testing';

import { PortalServiceService } from './portal-service.service';

describe('PortalServiceService', () => {
  let service: PortalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
