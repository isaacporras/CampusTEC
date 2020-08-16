import { TestBed } from '@angular/core/testing';

import { ViewChallengeService } from './view-challenge.service';

describe('ViewChallengeService', () => {
  let service: ViewChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
