import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise, ExerciseSet, ExerciseSetRep} from '../model/model';
import {FormControl, Validators} from '@angular/forms';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ExerciseLookupService} from '../exercise-lookup.service';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ExerciseSetService} from '../exercise-set.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-exercise-set',
  templateUrl: './add-exercise-set.component.html',
  styleUrls: ['./add-exercise-set.component.css']
})
export class AddExerciseSetComponent implements OnInit {

  exerciseSet = new ExerciseSet();

  selectedExercise = new Exercise();
  selectedNrReps = 10;

  filteredOptions: Observable<Exercise[]>;
  exerciseList: any;

  formControl = new FormControl('', [
    Validators.required
  ]);
  exerciseControl = new FormControl();

  // For the table
  setList: any;
  displayedColumns = ['name', 'description', 'reps', 'actions'];
  dataSource = new MatTableDataSource(this.setList); // need this here

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exerciseService: ExerciseLookupService,
              private exerciseSetService: ExerciseSetService,
              public snackBar: MatSnackBar,
              private router: Router) {
    this.exerciseSet.exerciseReps = [];
  }

  ngOnInit() {
    this.exerciseList = this.exerciseService.getList().subscribe(
      data => {
        this.exerciseList = data;
        this.filteredOptions = this.exerciseControl.valueChanges
          .pipe(
            startWith<string | Exercise>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.exerciseList.slice())
          );
      },
      err => {
        console.error(err);
      },
      () => console.log('done loading exercise list: ' + this.exerciseList[0])
    );

    this.fetchExerciseList();
  }

  private fetchExerciseList() {
    this.exerciseSetService.getList().subscribe(
      data => {
        this.setList = data;
        this.dataSource = new MatTableDataSource(this.setList);   // and need this here it seems

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.error(err),
      () => console.log('done loading exercise set list: ' + this.setList[0])
    );
  }

  filter(name: string): Exercise[] {
    return this.exerciseList.filter(exercise =>
      exercise.name.toLowerCase().includes(name.toLowerCase())); // indexOf(name.toLowerCase()) === 0);
  }

  save(exerciseSet) {
    this.exerciseSetService.save(exerciseSet).subscribe(
      data => {
        // refresh the list
        this.fetchExerciseList();

        this.snackBar.open(`${exerciseSet.name} saved, go try it out!`,
          '', {
            duration: 5000,
          });
        return true;
      },
      error => {
        console.error('Error saving exercise set: ' + error.message);
        this.snackBar.open(`Could not save: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    );
  }

  clear() {

  }

  addRep() {
    if (this.selectedExercise.name) {
      let exerciseSetRep = new ExerciseSetRep();
      exerciseSetRep.exercise = this.selectedExercise;
      exerciseSetRep.nrReps = this.selectedNrReps;
      exerciseSetRep.position = this.exerciseSet.exerciseReps.length;
      this.exerciseSet.exerciseReps.push(exerciseSetRep);
    }
  }

  moveUp(rep) {
    if (rep.position > 0 && this.exerciseSet.exerciseReps.length > 1) {
      rep.position--;
      this.exerciseSet.exerciseReps[rep.position].position++;
    }
    // this.exerciseSet.exerciseReps.find(obj => obj.position === rep.position)
  }

  moveDown(rep) {
    if (rep.position < this.exerciseSet.exerciseReps.length - 1) {
      rep.position++;
      this.exerciseSet.exerciseReps[rep.position].position--;
    }
  }

  remove(rep) {
    let elementPos = this.exerciseSet.exerciseReps.map(function (x) {
      return x.position;
    }).indexOf(rep.position);
    this.exerciseSet.exerciseReps.splice(elementPos);
  }

  // todo: needs to go in common lib
  displayFn(exercise?: Exercise): string | undefined {
    return exercise ? exercise.name : undefined;
  }

  editSet(exerciseSet) {
    this.exerciseSet = exerciseSet;
  }

  duplicateSet(exerciseSet) {
    let newExerciseSet = {...exerciseSet};
    newExerciseSet.id = null;
    newExerciseSet.name += ' (duplicate)';
    this.setList.push(newExerciseSet);
    this.save(newExerciseSet);

  }

  deleteSet(exerciseSet) {
    this.exerciseSetService.delete(exerciseSet.id).subscribe(
      data => {
        // refresh the list
        // this.fetchExerciseList();
        let elementPos = this.setList.map(function (x) {
          return x.id;
        }).indexOf(exerciseSet.id);
        this.setList.splice(elementPos);

        this.dataSource = new MatTableDataSource(this.setList);

        this.snackBar.open(`${exerciseSet.name} deleted!`,
          '', {
            duration: 5000,
          });
        return true;
      },
      error => {
        console.error('Error deleting exercise set: ' + error.message);
        this.snackBar.open(`Could not delete: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    );
  }

}
