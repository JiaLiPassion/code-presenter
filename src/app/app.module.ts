import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CodeComponent } from './code/code.component';
import { CodeService } from './code.service';
import { ConsoleComponent } from './console/console.component';
import { StackComponent } from './stack/stack.component';
import { DomComponent } from './dom/dom.component';
import { EventloopComponent } from './eventloop/eventloop.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [AppComponent, CodeComponent, ConsoleComponent, StackComponent, DomComponent, EventloopComponent, QueueComponent],
  imports: [BrowserModule],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
