import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CodeComponent } from './code/code.component';
import { CodeService } from './services/code.service';
import { ConsoleComponent } from './console/console.component';
import { StackComponent } from './stack/stack.component';
import { DomComponent } from './dom/dom.component';
import { EventloopComponent } from './eventloop/eventloop.component';
import { QueueComponent } from './queue/queue.component';
import { CodePresenterComponent } from './code-presenter/code-presenter.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'code', component: CodePresenterComponent, data: { mode: 'js' } },
  { path: 'zonecode', component: CodePresenterComponent, data: { mode: 'zone' }},
  { path: 'timeout', component: CodePresenterComponent, data: { mode: 'timeout' } },
  { path: 'zonetimeout', component: CodePresenterComponent, data: { mode: 'zonetimeout' } },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent, CodeComponent, ConsoleComponent, StackComponent, DomComponent,
    EventloopComponent, QueueComponent, CodePresenterComponent, HomeComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
