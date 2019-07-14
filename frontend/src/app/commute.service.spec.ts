import { TestBed } from '@angular/core/testing';

import { CommuteService } from './commute.service';

describe('CommuteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommuteService = TestBed.get(CommuteService);
    expect(service).toBeTruthy();
  });
});
