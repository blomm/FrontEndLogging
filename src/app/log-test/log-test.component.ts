import { Component, OnInit } from '@angular/core';
import { LoggingService, LogLevel } from '../shared/logging.service';

@Component({
  selector: 'app-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css']
})
export class LogTestComponent implements OnInit {

  verified = false;

  //added some comments....
  constructor(private loggingService: LoggingService) {

  }

  ngOnInit() {
    this.verified = false;
  }

  logMessage(): void {
    this.loggingService.level = LogLevel.All;
    this.loggingService.debug('hey this works! very cool', 'Paul', {reality:true, virtual:'hell yeah'}, true, 3);
    this.verified = this.verified === true ? false : true;
  }

}
