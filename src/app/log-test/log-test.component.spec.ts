import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTestComponent } from './log-test.component';
import { LoggingService } from '../shared/logging.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('LogTestComponent', () => {
  let component: LogTestComponent;
  let fixture: ComponentFixture<LogTestComponent>;
  let loggingService: LoggingService;
  let spy;
  let de: DebugElement;
  let el: HTMLElement;

  const loggingServiceStub = {
    log: () => { },
    debug:()=>{},
    error:()=>{},
    fatal:()=>{},
    warn:()=>{},
    info:()=>{}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTestComponent ],
      providers: [{provide: LoggingService, useValue: loggingServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTestComponent);
    // from the root injector
    loggingService = fixture.debugElement.injector.get(LoggingService);
    spy = spyOn(loggingService, 'debug');
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('p'));
    el = de.nativeElement;
  });

  it('should create and test string', () => {
    expect(component).toBeTruthy();
    // get the element's text
    expect(el.textContent).toContain('log-test works! verified: false');
  });

  it('should contain necessary methods', () => {
    expect(component.logMessage).toBeTruthy();
    //expect(component.shouldLog).toBeTruthy();
    //expect(component.writeToLog).toBeTruthy();
  });

  it('should have a service with two properties', () => {
    expect(loggingService).toBeTruthy();
  });

  it('should call log service when componenet attempts to log', () => {
    component.logMessage();
    expect(spy).toHaveBeenCalled();
    expect(el.textContent).toContain('log-test works! verified: false');
  });

  it('should change to true', () => {
    component.logMessage();
    expect(component.verified).toBeTruthy();
    component.logMessage();
    expect(component.verified).toBeFalsy();
  });


});
