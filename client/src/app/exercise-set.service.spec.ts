import { TestBed, inject } from '@angular/core/testing';

import { ExerciseSetService } from './exercise-set.service';

describe('ExerciseSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseSetService]
    });
  });

  it('should be created', inject([ExerciseSetService], (service: ExerciseSetService) => {
    expect(service).toBeTruthy();
  }));
});
