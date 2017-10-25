import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage } from './log-publishers';

@Injectable()
export class LogPublishersService {

  publishers: LogPublisher[] = [];

  constructor() {
    this.buildPublishers();
  }

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
  }

}
