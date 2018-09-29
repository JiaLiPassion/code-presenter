import { Component, OnInit, Input } from '@angular/core';
import { StackItem } from '../services/code.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @Input()
  stacks: StackItem[];
  @Input()
  title = 'Stacks';

  constructor() {}

  ngOnInit() {}

  getClass(idx: number) {
    const classNames = ['row' + (idx + 1)];
    if (this.stacks[idx].isZone) {
      classNames.push('zone');
    }
    return classNames;
  }
}
