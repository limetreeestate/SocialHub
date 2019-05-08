import { TestBed } from '@angular/core/testing';

import { YouTubeService } from './you-tube.service';

describe('YouTubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YouTubeService = TestBed.get(YouTubeService);
    expect(service).toBeTruthy();
  });
});
