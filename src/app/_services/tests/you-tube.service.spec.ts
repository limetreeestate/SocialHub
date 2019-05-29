import { TestBed } from '@angular/core/testing';

import { YouTubeService } from '../you-tube.service';
import { HttpClientModule } from '@angular/common/http';

describe('YouTubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: YouTubeService = TestBed.get(YouTubeService);
    expect(service).toBeTruthy();
  });
});
