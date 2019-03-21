import { TestBed } from '@angular/core/testing';

import { FacebookManagerService } from './facebook-manager.service';

describe('FacebookManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacebookManagerService = TestBed.get(FacebookManagerService);
    expect(service).toBeTruthy();
  });
});
