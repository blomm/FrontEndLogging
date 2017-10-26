import { Component, OnInit } from '@angular/core';
import { LoggingService, LogLevel } from '../shared/logging.service';
import { Product } from './product';

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
