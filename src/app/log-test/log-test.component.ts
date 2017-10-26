import { Component, OnInit } from '@angular/core';
import { LoggingService, LogLevel, LogEntry } from '../shared/logging.service';
import { Product } from './product';
import { LogLocalStorage } from '../shared/log-publishers';

@Component({
  selector: 'app-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css']
})
export class LogTestComponent implements OnInit {

  verified = false;
  localStorageEntries: LogEntry[];

  //added some comments....
  constructor(private loggingService: LoggingService) {

  }

  ngOnInit() {
    this.verified = false;
  }

  getLocalStorage(){
    let lsTemp = this.loggingService.publishers.find(p => p.constructor.name === 'LogLocalStorage');
    if(lsTemp !=null){
      let localStorage = lsTemp as LogLocalStorage;
      localStorage.getAll().subscribe(resp=>this.localStorageEntries = resp);
    }
  }

  clearLog():void{
    this.loggingService.clear();
  }

  logObject():void{
    let product: Product = new Product();

    product.productId = 1;
    product.productName = 'new product';
    product.url = 'http://myprod.com/great';
    product.price = 99.99;
    product.introductionDate = new Date();

    this.loggingService.log('This is an object: ', product );
  }

  logMessage(): void {
    this.loggingService.level = LogLevel.All;
    this.loggingService.debug('hey this works! very cool', 'Paul', {reality:true, virtual:'hell yeah'}, true, 3);
    this.verified = this.verified === true ? false : true;
  }

}
