import { TestBed } from '@angular/core/testing';

import { DogracingService } from './dogracing.service';

describe('DogracingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogracingService = TestBed.get(DogracingService);
    expect(service).toBeTruthy();
  });
});
