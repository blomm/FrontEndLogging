import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole } from './log-publishers';

@Injectable()
export class LogPublishersService {

  publishers: LogPublisher[] = [];

  constructor() {
    this.buildPublishers();
  }

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
  }



}
