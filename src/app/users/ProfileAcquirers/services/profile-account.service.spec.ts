import { TestBed } from '@angular/core/testing';

import { ProfileAccountService } from './profile-account.service';

describe('ProfileAccountService', () => {
  let service: ProfileAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
