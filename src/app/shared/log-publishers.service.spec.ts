import { TestBed, inject } from '@angular/core/testing';

import { LogPublishersService } from './log-publishers.service';

describe('LogPublishersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogPublishersService]
    });
  });

  it('should be created', inject([LogPublishersService], (service: LogPublishersService) => {
    expect(service).toBeTruthy();
  }));
});
