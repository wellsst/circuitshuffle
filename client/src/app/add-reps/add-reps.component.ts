import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith} from 'rxjs/operators';
import {ExerciseLookupService} from "../exercise-lookup.service";
import {Exercise, ExerciseHistory} from "../model/model";
import {throwError as observableThrowError, Observable} from 'rxjs';
import {HistoryService} from "../history.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-add-reps',
  templateUrl: './add-reps.component.html',
  styleUrls: ['./add-reps.component.css']
})
export class AddRepsComponent implements OnInit {

  repFormControl = new FormControl('', [
    Validators.required
  ]);

  rep = {
    completedOn: new Date(),
    reps: 10,
    exercise: null,
    timeTakenSecs: 60
  }
  //formGroup: FormGroup;

  exerciseList: any

  constructor(/*private fb: FormBuilder,*/
              private historyService: HistoryService,
              private exerciseService: ExerciseLookupService,
              public snackBar: MatSnackBar) {
    /*this.formGroup = this.fb.group({
      completedOn: new Date(),
      reps: [10, [Validators.min(2), Validators.max(100)]],
      timeTakenSecs: [60, [Validators.min(4), Validators.max(1000)]],
      exercise: new Exercise()
    })*/
  }

  filteredOptions: Observable<Exercise[]>;

  exerciseControl = new FormControl();

  ngOnInit() {

    this.exerciseList = this.exerciseService.getList().subscribe(
      data => {
        this.exerciseList = data
        this.filteredOptions = this.exerciseControl.valueChanges
          .pipe(
            startWith<string | Exercise>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.exerciseList.slice())
          );
      },
      err => console.error(err),
      () => console.log('done loading exercise list: ' + this.exerciseList[0])
    )
  }

  filter(name: string): Exercise[] {
    return this.exerciseList.filter(exercise =>
      exercise.name.toLowerCase().includes(name.toLowerCase())); //indexOf(name.toLowerCase()) === 0);
  }

  displayFn(exercise?: Exercise): string | undefined {
    return exercise ? exercise.name : undefined;
  }

  saveAddReps() {
    // ok example of post with service: https://stackoverflow.com/questions/43938598/angular-formgroup-display-json-errors-from-server-rest-api
    //let value = this.formGroup.value;
    let value = this.rep
    console.log(value)
    let history = new ExerciseHistory()
    history.completedOn = value.completedOn
    history.reps = value.reps
    history.timeTakenSecs = value.timeTakenSecs
    history.exercise = value.exercise
    this.historyService.addHistory(history).subscribe(
      data => {
        // refresh the list
        this.snackBar.open(`${value.reps} ${value.exercise.name}'s saved, well done!`,
          '', {
            duration: 5000,
          });
        return true;
      },
      error => {
        console.error("Error saving exercise rep: " + error.message);
        this.snackBar.open(`Could not save: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    )
  }

}
