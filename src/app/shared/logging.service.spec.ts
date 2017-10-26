import { TestBed, inject } from '@angular/core/testing';

import { LoggingService, LogLevel } from './logging.service';
import { LogPublisher } from './log-publishers';
import { LogPublishersService } from './log-publishers.service';
import { Observable } from 'rxjs/Observable';

describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggingService,
        LogPublishersService
      ]
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

  it('should have two publishers and call the log', inject([LoggingService], (service: LoggingService) => {
    //service.publishers = new Array<LogPublisher>();
    expect(service.publishers.length).toBe(2);
    expect(service.level).toBe(LogLevel.All);

    // The spy is designed such that any call to 'log' receives an immediately resolved promise with a test quote.
    // The spy bypasses the actual 'log' method and therefore does not contact the server.
    let spy = spyOn(service.publishers[0], 'log').and.returnValue(Observable.of('hi'));

    service.log('hey this is just a test');
    expect(spy.calls.any()).toBe(true, 'log was called');

    //service.level = LogLevel.Off;
  }));

  it('should not call log if the level is not set right', inject([LoggingService], (service: LoggingService) => {

    let spy = spyOn(service.publishers[0], 'log').and.returnValue(Observable.of('hi'));

    service.level = LogLevel.Fatal;

    service.debug('this is a call to log a debug, but it should not be logged');

    expect(spy.calls.any()).toBe(false, 'log was called');

  }));

});
