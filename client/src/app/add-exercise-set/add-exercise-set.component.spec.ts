import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseSetComponent } from './add-exercise-set.component';

describe('AddExerciseSetComponent', () => {
  let component: AddExerciseSetComponent;
  let fixture: ComponentFixture<AddExerciseSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
