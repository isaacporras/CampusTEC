import { TestBed } from '@angular/core/testing';

import { TecolonesConfigService } from './tecolones-config.service';

describe('TecolonesConfigService', () => {
  let service: TecolonesConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecolonesConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
