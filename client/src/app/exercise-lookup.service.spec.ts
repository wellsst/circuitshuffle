import { TestBed, inject } from '@angular/core/testing';

import { ExerciseLookupService } from './exercise-lookup.service';

describe('ExerciseLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseLookupService]
    });
  });

  it('should be created', inject([ExerciseLookupService], (service: ExerciseLookupService) => {
    expect(service).toBeTruthy();
  }));
});
