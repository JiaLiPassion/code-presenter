import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CodeService, StackItem } from './code.service';
import { EventloopComponent } from './eventloop/eventloop.component';

declare let Prism: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mode: string;
  code: string;
  hightlightLineNumber: number;
  consoleOutput: string[] = [];
  consoleStr: string;
  stacks: StackItem[] = [];
  domTasks: {text: string, img: string}[] = [];
  microtasks: string[] = [];
  macrotasks: string[] = [];
  eventtasks: string[] = [];

  @ViewChild(EventloopComponent) eventloopComponent: EventloopComponent;

  constructor(private codeService: CodeService) {}

  changeMode() {
    this.codeService.changeMode();
    this.mode = this.codeService.getMode();
    this.code = this.codeService.getCode();
    this.consoleOutput = [];
    this.consoleStr = '';
    this.stacks = [];
    this.domTasks = [];
    this.microtasks = [];
    this.macrotasks = [];
    this.eventtasks = [];

    this.hightlightLineNumber = 0;
    this.highlight();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    switch ($event.key) {
      case 'ArrowLeft': {
        this.codeService.advance(-1);
        break;
      }
      case 'ArrowRight': {
        this.codeService.advance(1);
        break;
      }
      case 'Enter': {
        this.codeService.advance(1);
        break;
      }
      case ' ': {
        this.codeService.advance(1);
        break;
      }
      default:
        return;
    }
    $event.preventDefault();
  }

  ngOnInit() {
    this.mode = this.codeService.getMode();
    this.code = this.codeService.getCode();
    this.codeService.stackEmiiter.addListener('stackAdvanced', (item: StackItem) => {
      // highlight Code
      this.hightlightLineNumber = item.lineNo;
      // If need to output to console, update the console datasource
      if (item.consoleDisplayString) {
        this.consoleOutput.push(item.consoleDisplayString);
        this.consoleStr = this.consoleOutput.join('\n');
      }
      // If need to clear stack, clear item.clearStack times
      if (typeof item.clearStack === 'number') {
        for (let i = 0; i < item.clearStack; i++) {
          this.stacks.shift();
        }
      }
      // If need to output to stack, update the stack datasource
      if (item.stackDisplayString) {
        this.stacks.unshift(item);
      }
      // If need to output to dom, update the dom datasource
      if (typeof item.clearDom === 'number') {
        for (let i = 0; i < item.clearDom; i++) {
          this.domTasks.shift();
        }
      }
      // If need to output to dom, update the dom datasource
      if (item.domDisplayString) {
        this.domTasks.unshift({
          text: item.domDisplayString,
          img: `assets/image/${this.getImageSrc(item.domDisplayString)}`
        });
      }

      this.eventloopComponent.setAction(item.eventloop);
      if (this.stacks.length === 0) {
        this.eventloopComponent.triggerEventLoop();
      }

      if (typeof item.clearMicroTask === 'number') {
        for (let i = 0; i < item.clearMicroTask; i++) {
          this.microtasks.shift();
        }
      }

      if (item.microTaskDisplayString) {
        this.microtasks.push(item.microTaskDisplayString);
      }

      if (typeof item.clearMacroTask === 'number') {
        for (let i = 0; i < item.clearMacroTask; i++) {
          this.macrotasks.shift();
        }
      }

      if (item.macroTaskDisplayString) {
        this.macrotasks.push(item.macroTaskDisplayString);
      }

      if (typeof item.clearEventTask === 'number') {
        for (let i = 0; i < item.clearEventTask; i++) {
          this.eventtasks.shift();
        }
      }

      if (item.eventTaskDisplayString) {
        this.eventtasks.push(item.eventTaskDisplayString);
      }

      this.highlight();
    });
  }

  highlight() {
    if (Prism) {
      // need to place a setTimeout, otherwise Prism
      // will not be able to use updated binding data.
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }

  getImageSrc(task: string) {
    task = task.split(' ')[0];
    switch (task) {
      case 'setTimeout':
        return 'loading.gif';
      case 'Promise.then':
        return 'promise.png';
      case 'addEventListener':
        return 'click.png';
      default:
        return 'blank.png';
    }
  }
}
