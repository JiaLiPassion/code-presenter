import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @Input() stacks: string[];

  constructor() {}

  ngOnInit() {}
}
