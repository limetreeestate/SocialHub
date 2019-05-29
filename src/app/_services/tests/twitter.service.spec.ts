import { TestBed } from '@angular/core/testing';

import { TwitterService } from '../twitter.service';
import { HttpClientModule } from '@angular/common/http';

describe('TwitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect(service).toBeTruthy();
  });
});
