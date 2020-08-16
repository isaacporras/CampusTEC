import { TestBed } from '@angular/core/testing';

import { ViewActivityService } from './view-activity.service';

describe('ViewActivityService', () => {
  let service: ViewActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
