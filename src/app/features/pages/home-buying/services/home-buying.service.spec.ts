import { TestBed } from '@angular/core/testing';

import { HomeBuyingService } from './home-buying.service';

describe('HomeBuyingService', () => {
  let service: HomeBuyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeBuyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
