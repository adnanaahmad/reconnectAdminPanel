import { TestBed } from '@angular/core/testing';

import { TeamDynastyService } from './team-dynasty.service';

describe('TeamDynastyService', () => {
  let service: TeamDynastyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDynastyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
