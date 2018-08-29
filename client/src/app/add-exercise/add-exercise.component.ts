import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ExerciseLookupService} from '../exercise-lookup.service';
import {Exercise, ExerciseType} from '../model/model';
import {FormControl, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  exercise = new Exercise();
  targetAreasSelected = [];
  targetAreas; // : Observable<ExerciseType[]>

  formControl = new FormControl('', [
    Validators.required
  ]);

  targetAreasControl = new FormControl();

  constructor(
    private exerciseService: ExerciseLookupService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.clearExercise();

    this.exerciseService.getTargetAreasList().subscribe(
      data => {
        this.targetAreas = data;
      },
      err => {
        console.error(err);
      },
      () => console.log('done targetAreas: ')
    );
  }

  clearExercise() {
    this.exercise = new Exercise();
    this.exercise.isPrivate = true;
    this.exercise.exerciseTypes = [];
  }

  saveExercise() {
    this.exercise.exerciseTypes = this.targetAreasControl.value;
    this.exerciseService.saveExercise(this.exercise).subscribe(
      data => {
        // refresh the list
        this.snackBar.open(`Exercise: ${this.exercise.name}'s saved!`,
          '', {
            duration: 5000,
          });
        return true;
      },
      error => {
        console.error('Error saving exercise: ' + error.message);
        this.snackBar.open(`Could not save: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    );
  }
}
