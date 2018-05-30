import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styleUrls: ['./dom.component.css']
})
export class DomComponent implements OnInit {
  @Input() items: { text: string, img: string }[];
  constructor() { }

  ngOnInit() {
  }

}
