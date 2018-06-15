import { Component, OnInit, Input } from '@angular/core';
import { StackItem } from '../services/code.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @Input() stacks: StackItem[];

  constructor() {}

  ngOnInit() {}

  getClass(idx: number) {
    const classNames = ['row' + (10 - this.stacks.length + idx)];
    if (this.stacks[idx].isZone) {
      classNames.push('zone');
    }
    return classNames;
  }
}
