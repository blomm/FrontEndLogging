import { LogEntry } from './logging.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


export abstract class LogPublishers {
  location: string;
  abstract log(record: LogEntry):Observable<boolean>;
  abstract clear():Observable<boolean>;
}

export class LogConsole extends LogPublishers{

  log(record: LogEntry): Observable<boolean> {
    console.log(record.buildLogString());
    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }

}
