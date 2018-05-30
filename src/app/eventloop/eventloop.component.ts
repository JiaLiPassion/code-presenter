import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventloop',
  templateUrl: './eventloop.component.html',
  styleUrls: ['./eventloop.component.css']
})
export class EventloopComponent implements OnInit {
  imgSrc = 'assets/image/eventloop.png';
  text: string;
  constructor() { }

  ngOnInit() {
  }

  setAction(action: string) {
    this.text = action;
  }

  triggerEventLoop() {
    let idx = 1;
    const handler = () => {
      if (idx === 4) {
        return;
      }
      this.imgSrc = `assets/image/eventloop${idx}.png`;
      idx++;
      requestAnimationFrame(handler);
    };
    requestAnimationFrame(handler);
  }
}
