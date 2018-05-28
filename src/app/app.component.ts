import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  code: string;
  hightlightLineNumber: number;

  constructor() {}

  ngOnInit() {
    this.code = `
    var handler = function(evt){
      console.log('click handler invoked');
      var promise = new Promise(function(resolve, _) {
        setTimeout(function() {
          console.log('timer callback invoked');
          // resolve promise, schedule microtask
          console.log('schedule microTask for then callback');
          resolve();
        }, 1000);
      });
      promise.then(function() {
        console.log('Promise resolved, then callback invoked');
      });
    };
    console.log('add click handler to button');
    button.addEventHandler('click', handler);
    `;
    this.hightlightLineNumber = 5;
  }
}
