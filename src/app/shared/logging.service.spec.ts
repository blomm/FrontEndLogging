import { TestBed, inject } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingService]
    });
  });

  it('should be created', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));

  it('should have necessary methods', inject([LoggingService], (service: LoggingService) => {
    expect(service.log).toBeTruthy();
    expect(service.debug).toBeTruthy();
    expect(service.info).toBeTruthy();
    expect(service.fatal).toBeTruthy();
    expect(service.error).toBeTruthy();
    expect(service.warn).toBeTruthy();

    expect(service.level).toBeDefined();
    expect(service.logWithDate).toBeDefined();

  }));
});
