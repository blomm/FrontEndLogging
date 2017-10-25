import { Injectable } from '@angular/core';
import { LogPublishersService } from './log-publishers.service';
import { LogPublisher } from './log-publishers';


export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry{
  entryDate: Date = new Date();
  message:string ='';
  level:LogLevel= LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate:boolean = true;

  buildLogString():string{
    let ls = '';
    if(this.logWithDate){
      ls += this.entryDate;
    }
    ls += ' Type: ' + this.message;
    ls += ' Message: ' + LogLevel[this.level];
    if(this.extraInfo.length){
      ls += ' Extra Info: ' + this.formatParams(this.extraInfo);
    }
    return ls;
  }

  private formatParams(params:any[]):string{
    let retVal = params.join(',');
    //if we have any objects
    if(params.some(p => typeof p === 'object')){
      retVal='';
      for(let param of params){
        retVal+=JSON.stringify(param) + ',';
      }
    }
    return retVal;
  }
}

@Injectable()
export class LoggingService {

  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;
  publishers: LogPublisher[];

  constructor(private publishersService:LogPublishersService) {
    this.publishers = this.publishersService.publishers;
  }

  private shouldLog(logLevel:LogLevel): boolean{

    let log:boolean=false;

    if(logLevel !== LogLevel.Off && logLevel >= this.level){
      log = true;
    }

    return log;
  }

  private writeToLog(msg:string, logLevel:LogLevel, params: any[]):void{

    if(this.shouldLog(logLevel)){
      let entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = logLevel;
      entry.extraInfo = params;
      entry.level = logLevel;
      entry.logWithDate = this.logWithDate;

      //console.log(entry.buildLogString());
      //itterate all logs....
      for(let logger of this.publishers){
        logger.log(entry).subscribe(resp=>{
          console.log(resp);
        });
      }
    }
  }

  debug(msg:string, ...optionalParameters:any[]){
    this.writeToLog(msg, LogLevel.Debug, optionalParameters);
  }
  info(msg:string, ...optionalParameters:any[]){
    this.writeToLog(msg, LogLevel.Info, optionalParameters);
  }
  warn(msg:string, ...optionalParameters:any[]){
    this.writeToLog(msg, LogLevel.Warn, optionalParameters);
  }
  error(msg:string, ...optionalParameters:any[]){
    this.writeToLog(msg, LogLevel.Error, optionalParameters);
  }
  fatal(msg:string, ...optionalParameters:any[]){
    this.writeToLog(msg, LogLevel.Fatal, optionalParameters);
  }

  log(msg: string, ...optionalParameters:any[]) {
    this.writeToLog(JSON.stringify(msg), LogLevel.All, optionalParameters);
    //console.log(new Date() + ': ' + JSON.stringify(message));
  }

}
