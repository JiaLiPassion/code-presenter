import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  @Input() output: string;
  constructor(private codeService: CodeService) {}

  ngOnInit() {}

  prev() {
    this.codeService.advance(-1);
  }

  next() {
    this.codeService.advance(1);
  }
}
