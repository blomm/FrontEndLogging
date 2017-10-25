import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogTestComponent } from './log-test/log-test.component';
import { LoggingService } from './shared/logging.service';
import { LogPublishersService } from './shared/log-publishers.service';

@NgModule({
  declarations: [
    AppComponent,
    LogTestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LoggingService, LogPublishersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
