import { TestBed } from '@angular/core/testing';

import { PlanesApiService } from './planes-api.service';

describe('PlanesApiService', () => {
  let service: PlanesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
