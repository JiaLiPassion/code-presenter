import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventloopComponent } from './eventloop.component';

describe('EventloopComponent', () => {
  let component: EventloopComponent;
  let fixture: ComponentFixture<EventloopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventloopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventloopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
