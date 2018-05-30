import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  @Input() items: string[];
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

  getClass(idx: number) {
    return `queue${idx + 1}`;
  }

}
