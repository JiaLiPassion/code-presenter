import { Component, OnInit, HostListener } from '@angular/core';
import { CodeService, StackItem } from './code.service';

declare let Prism: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  code: string;
  hightlightLineNumber: number;
  consoleOutput: string[] = [];
  consoleStr: string;
  stacks: string[] = [];

  constructor(private codeService: CodeService) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    switch ($event.key) {
      case 'ArrowLeft': {
        this.codeService.advance(-1);
        break;
      }
      case 'ArrowRight': {
        this.codeService.advance(1);
        break;
      }
      case 'Enter': {
        this.codeService.advance(1);
        break;
      }
      case ' ': {
        this.codeService.advance(1);
        break;
      }
      default:
        return;
    }
    $event.preventDefault();
  }

  ngOnInit() {
    this.code = this.codeService.getCode();
    this.codeService.stackEmiiter.addListener('stackAdvanced', (item: StackItem) => {
      this.hightlightLineNumber = item.lineNo;
      if (item.consoleDisplayString) {
        this.consoleOutput.push(item.consoleDisplayString);
        this.consoleStr = this.consoleOutput.join('\n');
      }
      if (typeof item.clearStack === 'number') {
        for (let i = 0; i < item.clearStack; i++) {
          this.stacks.shift();
        }
      }
      if (item.stackDisplayString) {
        this.stacks.unshift(item.stackDisplayString);
      }
      if (Prism) {
        Prism.highlightAll();
      }
    });
  }
}
