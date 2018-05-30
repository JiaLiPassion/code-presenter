import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

export interface StackItem {
  lineNo: number;
  stackDisplayString?: string;
  domDisplayString?: string;
  consoleDisplayString?: string;
  microTaskDisplayString?: string;
  macroTaskDisplayString?: string;
  clearStack?: number;
  clearDom?: number;
  clearMicroTask?: number;
  clearMacroTask?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private code: string;
  private stacks: StackItem[];
  stackEmiiter: EventEmitter = new EventEmitter();
  private currentStack: number;
  constructor() {
    this.code = `var handler = function(evt){
      console.log('click handler invoked');
      var promise = new Promise(function(resolve, _) {
        setTimeout(function() {
          console.log('timer callback invoked');
          console.log('schedule microTask for then callback');
          resolve();
        }, 1000);
      });
      promise.then(function() {
        console.log('Promise resolved, then callback invoked');
      });
    };
    console.log('add click handler to button');
    button.addEventListener('click', handler);
    dispatchEvent(clickEvent);
    `;
    this.stacks = [
      { lineNo: 0, stackDisplayString: 'main' },
      { lineNo: 1, stackDisplayString: 'var handler = ...' },
      {
        lineNo: 14,
        stackDisplayString: 'console.log',
        consoleDisplayString: 'add click handler to button',
        clearStack: 1
      },
      {
        lineNo: 15,
        stackDisplayString: 'addEventListener',
        domDisplayString: 'addEventListener',
        clearStack: 1
      },
      {
        lineNo: 16,
        stackDisplayString: 'dispatchEvent',
        domDisplayString: 'handleEvent',
        clearStack: 1
      },
      {
        lineNo: 2,
        stackDisplayString: 'console.log',
        clearStack: 1,
        clearDom: 1
      },
      {
        lineNo: 3,
        stackDisplayString: 'new Promise',
        clearStack: 1
      },
      {
        lineNo: 4,
        stackDisplayString: 'setTimeout',
        domDisplayString: 'setTimeout'
      },
      {
        lineNo: 10,
        stackDisplayString: 'promise.then',
        clearStack: 2
      },
      {
        lineNo: 5,
        macroTaskDisplayString: 'setTimeout'
      },
      {
        lineNo: 5,
        stackDisplayString: 'timeout callback',
        clearMacroTask: 1
      },
      {
        lineNo: 5,
        stackDisplayString: 'console.log',
        clearStack: 1,
        clearDom: 1
      },
      {
        lineNo: 6,
        stackDisplayString: 'console.log',
        clearStack: 1
      },
      {
        lineNo: 7,
        stackDisplayString: 'resolve',
        clearStack: 1
      },
      {
        lineNo: 7,
        microTaskDisplayString: 'Promise.then'
      },
      {
        lineNo: 7,
        microTaskDisplayString: 'Promise.then'
      },
      {
        lineNo: 11,
        stackDisplayString: 'then callback',
        clearMicroTask: 1
      },
      {
        lineNo: 11,
        stackDisplayString: 'console.log'
      },
      {
        lineNo: 12,
        clearStack: 2
      }
    ];

    this.currentStack = -1;
  }

  getCode(): string {
    return this.code;
  }

  getCodeStack() {
    return this.stacks;
  }

  advance(step: number) {
    this.currentStack += step;
    if (this.currentStack >= this.stacks.length) {
      this.currentStack = 0;
    } else if (this.currentStack < 0) {
      this.currentStack = 0;
    }
    this.stackEmiiter.emit('stackAdvanced', this.stacks[this.currentStack]);
  }
}
