import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

import * as js from './js.repo';
import * as zone from './zone.repo';

export interface StackItem {
  lineNo: number;
  stackDisplayString?: string;
  domDisplayString?: string;
  consoleDisplayString?: string;
  microTaskDisplayString?: string;
  macroTaskDisplayString?: string;
  eventTaskDisplayString?: string;
  clearStack?: number;
  clearDom?: number;
  clearMicroTask?: number;
  clearMacroTask?: number;
  clearEventTask?: number;
  eventloop?: string;
  isZone?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private code: string;
  private stacks: StackItem[];
  stackEmiiter: EventEmitter = new EventEmitter();
  private currentStack: number;
  mode = 'js';
  constructor() {
    this.init();
  }

  getMode() {
    return this.mode;
  }

  changeMode() {
    if (this.mode === 'js') {
      this.mode = 'zone.js';
    } else if (this.mode === 'zone.js') {
      this.mode = 'js';
    }
    this.init();
  }

  init() {
    if (this.mode === 'js') {
      this.code = js.code;
      this.stacks = js.stacks;
    } else if (this.mode === 'zone.js') {
      this.code = zone.code;
      this.stacks = zone.stacks;
    }
    this.currentStack = -1;
  }

  getCode(): string {
    return this.code;
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
