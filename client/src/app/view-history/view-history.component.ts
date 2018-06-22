import {Component, OnInit, Injectable, ElementRef, ViewChild} from '@angular/core';

import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {HistoryService} from "../history.service";
import {Exercise} from "../model/model";

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  exerciseControl = new FormControl();

  filteredExercises: Observable<any[]>;

  selectedExercises = [
    //'Push-ups',
  ];

  allExercises = [
    'Push-ups',
    'Chin-ups',
    'L-Sits',
    'Squats',
    'Skipping'
  ];

  @ViewChild('exerciseFilterInput') exerciseFilterInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['exercise', 'today', 'yesterday', 'hours24', 'days3', 'week', 'month', 'year', 'all'];
  summaries = []
  dataSource = new MatTableDataSource(this.summaries);


  ngOnInit() {
    this.refreshSummaries()
  }

  constructor(private historyService: HistoryService) {

    /*this.filteredExercises = this.exerciseControl.valueChanges.pipe(
      startWith(null),
      map((exercise: string | null) => exercise ? this.filter(exercise) : this.allExercises.slice()));*/
  }

/*

*/

  remapSummary(keyValSummaryList, periodName) {
    for (let summary of keyValSummaryList) {
      let s = this.summaries.filter(
        e => e.exercise === summary.key
      )
      if (s.length == 0) {
        this.summaries.push({exercise: summary.key, [periodName]: summary.val})
      } else {
        let obj = s[0]
        obj[periodName] = summary.val
      }

    }
  }

  public refreshSummaries() {
    this.historyService.refreshHistories().subscribe(
      data => {

        this.remapSummary(this.historyService.getSummaryForToday(data), "today")
        this.remapSummary(this.historyService.getSummaryFor24Hours(data), "hours24")
        this.remapSummary(this.historyService.getSummaryForYesterday(data), "yesterday")
        this.remapSummary(this.historyService.getSummaryFor3Days(data), "days3")
        this.remapSummary(this.historyService.getSummaryForWeek(data), "week")
        this.remapSummary(this.historyService.getSummaryFor4Weeks(data), "month")
        this.remapSummary(this.historyService.getSummaryForThisYear(data), "year")
        this.remapSummary(this.historyService.getSummaryForAll(data), "all")

        console.log(this.summaries)


        this.dataSource = new MatTableDataSource(this.summaries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // this.summaries.push({header: "Today", summaries: matTableDataSource})

        /*this.summaries.push({header: "24 Hours", summaries: this.historyService.getSummaryFor24Hours(data)})
        this.summaries.push({header: "3 Day", summaries: this.historyService.getSummaryFor3Days(data)})
        this.summaries.push({header: "Yesterday", summaries: this.historyService.getSummaryForYesterday(data)})
        this.summaries.push({header: "Week", summaries: this.historyService.getSummaryForWeek(data)})
        this.summaries.push({header: "Month", summaries: this.historyService.getSummaryFor4Weeks(data)})
        this.summaries.push({header: "Year", summaries: this.historyService.getSummaryForThisYear(data)})
        this.summaries.push({header: "All", summaries: this.historyService.getSummaryForAll(data)})*/
      },
      err => {
        console.error(err)
        //this.authenticationService.logout()
      },
      () => console.log('done loading history: ')
    )

  }

  // TODO: Filter on the exercise name...maybe
  /*add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our exercise
    if ((value || '').trim()) {
      this.selectedExercises.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.exerciseControl.setValue(null);
  }

  remove(exercise: any): void {
    const index = this.selectedExercises.indexOf(exercise);

    if (index >= 0) {
      this.selectedExercises.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allExercises.filter(exercise =>
      exercise.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedExercises.push(event.option.viewValue);
    this.exerciseFilterInput.nativeElement.value = '';
    this.exerciseControl.setValue(null);
  }
*/

 /* applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.summaries.filter(
      e => (
        // Added initial opening brace
        (e.summaries.values.val.toLowerCase().indexOf(filterValue) === 0)
      )// added closing brace
    ).slice(0, 9);
  }*/


}
