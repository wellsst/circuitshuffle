import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ExerciseLookupService} from '../exercise-lookup.service';
import {throwError as observableThrowError} from 'rxjs/index';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exerciseList: any;
  displayedColumns = ['name', 'targeting', 'description', 'isPrivate', 'actions'];
  dataSource = new MatTableDataSource(this.exerciseList); // need this here
  skipList: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exerciseService: ExerciseLookupService,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.fetchExerciseList();
  }

  private fetchExerciseList() {
    this.exerciseService.getFullList().subscribe(
      data => {
        this.exerciseList = data;
        this.dataSource = new MatTableDataSource(this.exerciseList);   // and need this here it seems

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log('done loading exercise list: ' + this.exerciseList[0]);
        this.exerciseService.getSkipList().subscribe(
          skipList => {
            this.skipList = skipList;
            for (let exercise of this.exerciseList) {
              if (this.isInSkipList(exercise)) {
                exercise.skip = true;
              }
            }
          },
          () => console.log('done loading exercise skip list: ' + this.exerciseList[0])
        );
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteExercise(exercise) {
    this.exerciseService.delete(exercise.id).subscribe(
      data => {
        // refresh the list
        this.snackBar.open(`Exercise: ${exercise.name}'s deleted!`,
          '', {
            duration: 5000,
          });

        this.fetchExerciseList();

        return true;
      },
      error => {
        console.error('Error deleting exercise: ' + error.message);
        this.snackBar.open(`Could not delete: ${error.message}`,
          '', {
            duration: 10000,
          });
        return observableThrowError(error);
      }
    );
  }

  addToSkipList(exercise) {
     // todo: complete this
    this.exerciseService.addToSkipList(exercise.id).subscribe(
      skipList => {
        this.skipList = skipList;
        exercise.skip = true;
      },
      () => console.log('done adding to exercise skip list: ' + exercise.id)
    );
  }

  removeFromSkipList(exercise) {
    this.exerciseService.removeFromSkipList(exercise.id).subscribe(
      skipList => {
        this.skipList = skipList;
        exercise.skip = false;
      },
      () => console.log('done removing from exercise skip list: ' + exercise.id)
    );
  }

  isInSkipList(exercise) {
    let found = this.skipList.find(ex => ex.id === exercise.id);
    return found != null;
  }
}
