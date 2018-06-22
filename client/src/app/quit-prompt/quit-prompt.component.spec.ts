import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitPromptComponent } from './quit-prompt.component';

describe('QuitPromptComponent', () => {
  let component: QuitPromptComponent;
  let fixture: ComponentFixture<QuitPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
