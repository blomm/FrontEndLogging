import { LogEntry } from './logging.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry):Observable<boolean>;
  abstract clear():Observable<boolean>;
}

export class LogConsole extends LogPublisher{

  log(record: LogEntry): Observable<boolean> {
    console.log(record.buildLogString());
    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }

}

export class LogLocalStorage extends LogPublisher{

  constructor(){
    super();

    this.location = 'logging';
  }

  log(record: LogEntry): Observable<boolean> {
    let retValue: boolean = false;
    let records: LogEntry[];
    try {
      records = JSON.parse(localStorage.getItem(this.location)) || [];
      records.push(record);
      localStorage.setItem(this.location, JSON.stringify(records));
      retValue = true;
    } catch (ex) {
      console.log(ex);
    }

    return Observable.of(retValue);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }

}
