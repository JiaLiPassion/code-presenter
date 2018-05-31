import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePresenterComponent } from './code-presenter.component';

describe('CodePresenterComponent', () => {
  let component: CodePresenterComponent;
  let fixture: ComponentFixture<CodePresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
