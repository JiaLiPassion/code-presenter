import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

import repo from '../repo';
const { js, zone, timeout, zonetimeout } = repo;

export interface StackItem {
  lineNo: number;
  stackDisplayString?: string;
  domDisplayString?: string;
  consoleDisplayString?: string;
  microTaskDisplayString?: string;
  macroTaskDisplayString?: string;
  zoneMacroTaskDisplayString?: string;
  eventTaskDisplayString?: string;
  clearStack?: number;
  clearDom?: number;
  clearMicroTask?: number;
  clearMacroTask?: number;
  clearZoneMacroTask?: number;
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
  constructor() {
    this.init('js');
  }

  changeMode(mode: string) {
    this.init(mode);
  }

  init(mode: string) {
    switch (mode) {
      case 'js':
        this.code = js.code;
        this.stacks = js.stacks;
        break;
      case 'zone':
        this.code = zone.code;
        this.stacks = zone.stacks;
        break;
      case 'timeout':
        this.code = timeout.code;
        this.stacks = timeout.stacks;
        break;
      case 'zonetimeout':
        this.code = zonetimeout.code;
        this.stacks = zonetimeout.stacks;
        break;
      case 'promise':
        this.code = js.code;
        this.stacks = js.stacks;
        break;
      case 'zonepromise':
        this.code = js.code;
        this.stacks = js.stacks;
        break;
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
