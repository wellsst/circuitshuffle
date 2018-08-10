import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {ExerciseLookupService} from '../exercise-lookup.service';
import {Exercise, ExerciseHistory, ExerciseSet} from '../model/model';
import {throwError as observableThrowError, Observable} from 'rxjs';
import {HistoryService} from '../history.service';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ExerciseSetService} from '../exercise-set.service';
import {SelectionModel} from '@angular/cdk/collections';

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
    nrReps: 10,
    exercise: null,
    timeTakenSecs: 60
  };
  // formGroup: FormGroup;

  exerciseList: any;

  // Setup for table to display the ExerciseSets
  setList: any;
  displayedColumns = ['select', 'name', 'description', 'reps'];
  dataSource = new MatTableDataSource(this.setList); // need this here

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // for table selections
  initialSelection = [];
  allowMultiSelect = true;
  selectedSets = new SelectionModel<ExerciseSet>(this.allowMultiSelect, this.initialSelection);

  selectedTab = new FormControl(0);

  constructor(/*private fb: FormBuilder,*/
              private historyService: HistoryService,
              private exerciseService: ExerciseLookupService,
              private exerciseSetService: ExerciseSetService,
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
        this.exerciseList = data;
        this.filteredOptions = this.exerciseControl.valueChanges
          .pipe(
            startWith<string | Exercise>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.exerciseList.slice())
          );
      },
      err => console.error(err),
      () => console.log('done loading exercise list: ' + this.exerciseList[0])
    );


    this.setList = this.exerciseSetService.getList().subscribe(
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

  // todo: needs to go in common lib
  displayFn(exercise?: Exercise): string | undefined {
    return exercise ? exercise.name : undefined;
  }

  saveAddReps() {
    // ok example of post with service:
    // https://stackoverflow.com/questions/43938598/angular-formgroup-display-json-errors-from-server-rest-api
    // let value = this.formGroup.value;
    switch (this.selectedTab.value) {
      case 0:
        this.saveSingleRep();
        break;
      case 1:
        this.saveFromSets();
        break;
      default:
        break;
    }

  }

  private saveSingleRep() {
    let singleRep = this.rep;

    if (singleRep.exercise) {
      console.log(singleRep);
      let history = new ExerciseHistory();
      history.completedOn = singleRep.completedOn;
      history.reps = singleRep.nrReps;
      history.timeTakenSecs = singleRep.timeTakenSecs;
      history.exercise = singleRep.exercise;
      this.saveAsExerciseHistory(history);
    } else {
      this.snackBar.open(`You need to select an exercise`,
        '', {
          duration: 5000,
        });
    }
  }

  private saveAsExerciseHistory(history) {

    this.historyService.addHistory(history).subscribe(
      data => {
        // refresh the list
        this.snackBar.open(`${history.reps} ${history.exercise.name}'s saved, well done!`,
          '', {
            duration: 5000,
          });
        return true;
      },
      error => {
        // console.error('Error saving exercise rep: ' + error.message);
        this.snackBar.open(`Could not save: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    );
  }

  saveFromSets() {
    this.selectedSets.selected.forEach(set => {
      // console.log("Saving set: " + set.name)
      let history = new ExerciseHistory();
      history.completedOn = this.rep.completedOn;
      history.timeTakenSecs = this.rep.timeTakenSecs;

      set.exerciseReps.forEach(rep => {
        history.reps = rep.nrReps;
        history.exercise = rep.exercise;
        this.saveAsExerciseHistory(history);
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectedSets.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectedSets.clear() :
      this.dataSource.data.forEach(row => this.selectedSets.select(row));
  }

}
