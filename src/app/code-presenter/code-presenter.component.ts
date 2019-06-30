import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { CodeService, StackItem } from '../services/code.service';
import { EventloopComponent } from '../eventloop/eventloop.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

declare let Prism: any;
@Component({
  selector: 'app-code-presenter',
  templateUrl: './code-presenter.component.html',
  styleUrls: ['./code-presenter.component.css']
})
export class CodePresenterComponent implements OnInit {
  @Input() mode: string;
  fontClass = 'normal-code';
  codeClass = 'codeblock';
  consoleClass = 'console';

  code: string;
  hightlightLineNumber: number;
  consoleOutput: string[] = [];
  consoleStr: string;
  stacks: StackItem[] = [];
  domTasks: { text: string; img: string }[] = [];
  microtasks: string[] = [];
  macrotasks: string[] = [];
  zoneMacrotasks: string[] = [];
  eventtasks: string[] = [];

  @ViewChild(EventloopComponent) eventloopComponent: EventloopComponent;

  constructor(private codeService: CodeService, private route: ActivatedRoute) {}

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
      case 'n': {
        this.codeService.advance(1);
        break;
      }
      case 'N': {
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
    this.route.data.subscribe(paramMode => {
      if (paramMode && this.mode !== paramMode.mode) {
        this.mode = paramMode.mode;
        this.codeService.changeMode(this.mode);
      }
      this.init();
      if (this.code.split('\n').length >= 20) {
        this.fontClass = 'smaller';
        this.codeClass = 'codeblocksmaller';
        this.consoleClass = 'consolesmaller';
      }
    });
  }

  init() {
    this.code = this.codeService.getCode();
    this.highlight();
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

      if (typeof item.clearZoneMacroTask === 'number') {
        for (let i = 0; i < item.clearZoneMacroTask; i++) {
          this.zoneMacrotasks.shift();
        }
      }

      if (item.macroTaskDisplayString) {
        this.macrotasks.push(item.macroTaskDisplayString);
      }

      if (item.zoneMacroTaskDisplayString) {
        this.zoneMacrotasks.push(item.zoneMacroTaskDisplayString);
      }

      if (typeof item.clearEventTask === 'number') {
        for (let i = 0; i < item.clearEventTask; i++) {
          this.eventtasks.shift();
        }
      }

      if (item.eventTaskDisplayString) {
        this.eventtasks.push(item.eventTaskDisplayString);
      }

      if (this.stacks.length === 0 && this.microtasks.length === 0) {
        this.eventloopComponent.triggerEventLoop();
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
