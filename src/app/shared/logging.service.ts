import { Injectable } from '@angular/core';


export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6

}

@Injectable()
export class LoggingService {

  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  constructor() {

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
      let fullMessage: string = '';
      if(this.logWithDate){
        fullMessage += new Date()+ ' - ';
      }
      fullMessage += 'Type: ' + LogLevel[logLevel];
      fullMessage += ' - Message: ' + msg;
      fullMessage += ' - More Info: ' + this.formatParams(params);
      console.log(fullMessage);
    }
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
