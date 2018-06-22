import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCircuitComponent } from './start-circuit.component';

describe('StartCircuitComponent', () => {
  let component: StartCircuitComponent;
  let fixture: ComponentFixture<StartCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
