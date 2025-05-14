import { TestBed } from '@angular/core/testing';

import { AIIssuesService } from './aiissues.service';

describe('AIIssuesService', () => {
  let service: AIIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AIIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
