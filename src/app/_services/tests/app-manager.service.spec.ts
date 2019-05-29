import { TestBed } from '@angular/core/testing';

import { AppManagerService } from '../app-manager.service';

describe('AppManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppManagerService = TestBed.get(AppManagerService);
    expect(service).toBeTruthy();
  });
});
