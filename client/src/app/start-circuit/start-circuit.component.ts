import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {throwError as observableThrowError, Observable} from 'rxjs';
import {map, startWith} from "rxjs/operators";

import {ExerciseRepetition, ExerciseHistory, Exercise, SuitType, ExerciseSet} from '../model/model';
import {SUIT_TYPES, SHORT_MSGS} from '../model/seed-data';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HistoryService} from "../history.service";
import {ExerciseLookupService} from "../exercise-lookup.service";
import {MatAutocompleteSelectedEvent, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import * as _ from 'lodash'
import {TimerComponent} from "../timer/timer.component";
import {Subscription} from "rxjs/Rx";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {QuitPromptComponent} from "../quit-prompt/quit-prompt.component";
import {SelectionModel} from '@angular/cdk/collections';
import {ExerciseSetService} from '../exercise-set.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-start-circuit',
  templateUrl: './start-circuit.component.html',
  styleUrls: ['./start-circuit.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class StartCircuitComponent implements OnInit {

  @Input() isVisible: boolean = true;
  visibility = 'shown';

  showStartCircuitDialog = true
  showDoingCircuitDialog = false

  suits = SUIT_TYPES
  shortMsgs = SHORT_MSGS
  currentMsg = ''

  minReps = 4
  maxReps = 10

  filteredExercises: Observable<Exercise[]>;

  exerciseList: any

  currentRep: ExerciseRepetition
  totalReps = 0
  repsCompleted = 0
  totalSets = 0
  setsCompleted = 0
  circuitComplete = true

  // For the timer
  repSecs = 0
  totalSecs = 0
  thisCircuitTotalSecs = 0
  private subscription: Subscription;
  period = 1000
  timer: any
  private tick: number;

  repStartOn: any; // moment

  circuitHistory: Map<number, ExerciseHistory>
  circuitToDo: ExerciseRepetition[]
  allowWildcards = true

  circuitSetupControl = new FormControl();
  circuitSetupControls = [];

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

  constructor(private exerciseService: ExerciseLookupService,
              private historyService: HistoryService,
              private exerciseSetService: ExerciseSetService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router) {

    for (let suit of this.suits) {
      suit.circuitSetupControl = new FormControl()
    }
  }

  ngOnInit() {
    // this.setupTimer();
    // this.exerciseList = this.exerciseService.getFullList().subscribe(
    this.exerciseList = this.exerciseService.getUserNonSkipList().subscribe(
      data => {
        this.exerciseList = data

        this.suits.forEach( suit => {
          suit.filteredExercises = suit.circuitSetupControl.valueChanges
            .pipe(
              startWith<string | Exercise>(''),
              map(value => typeof value === 'string' ? value : (value as Exercise).name as string),
              map(name => name ? this.filter(name as string) : this.exerciseList.slice())
            );
        })
        /*this.filteredExercises[0] = this.circuitSetupControls[0].valueChanges
          .pipe(
            startWith<string | Exercise>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.exerciseList.slice())
          );
        */
      },
      err => console.error(err),
      () => console.log('done loading exercise list: ' + this.exerciseList.length)
    );

    this.exerciseSetService.getList().subscribe(
      data => {
        this.setList = data;
        this.dataSource = new MatTableDataSource(this.setList);   // and need this here it seems

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.error(err);
      },
      () => console.log('done loading exercise set list: ' + this.setList[0])
    );
  }


  private setupTimer() {
    this.timer = TimerObservable.create(1000, this.period);
    this.subscription = this.timer.subscribe(t => {
      this.repSecs += (this.period / 1000)
      this.totalSecs += (this.period / 1000)
      this.tick = t;
      /*this.days = Math.floor(t / 86400)
      t -= this.days * 86400
      this.hours = Math.floor(t / 3600) % 24
      t -= this.hours * 3600
      this.mins = Math.floor(t / 60) % 60
      t -= this.mins * 60
      this.secs = t % 60*/
    });
  }

  filter(name: string): Exercise[] {
    return this.exerciseList.filter(exercise =>
      exercise.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: Exercise): string | undefined {
    return user ? user.name : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent, suit: SuitType) {
    /*console.log (event.option.value)
    console.log (suit.name)*/
    suit.selectedExercise = event.option.value
  }


  /**
   * Creates the circuit the user will do
   */
  startCircuit() {
    this.showStartCircuitDialog = false

    this.circuitComplete = false

    this.totalReps = 0
    this.repsCompleted = 0

    this.totalSets = 0
    this.setsCompleted = 0
    this.thisCircuitTotalSecs = 0

    let circuit = []
    this.circuitHistory = new Map();

    switch (this.selectedTab.value) {
      case 0:
        this.buildShuffledCircuit(circuit);
        break;
      case 1:
        this.buildSetBasedCircuit(circuit)
        break;
      default:
        break;
    }
    this.setupTimer();
    // this.startCircuit
    this.repStartOn = moment()
    this.doNextRep()

    console.log(circuit)

    this.showDoingCircuitDialog = true
  }

  private buildSetBasedCircuit(circuit) {
    this.selectedSets.selected.forEach(set => {

      set.exerciseReps.forEach(rep => {
        let repToDo = new ExerciseRepetition();
        repToDo.reps = rep.nrReps;
        repToDo.exercise = rep.exercise;
        repToDo.suit = {name: set.name, iconName: "dagger", id: 9999};
        this.totalReps += repToDo.reps;
        this.totalSets += 1;
        circuit.push(repToDo);

        let exerciseHistory = new ExerciseHistory();
        exerciseHistory.exercise = repToDo.exercise;
        exerciseHistory.reps = 0;
        this.circuitHistory.set(repToDo.suit.id, exerciseHistory);
        // rep.exercise = suit.selectedExercise;

      });
    });
    this.circuitToDo = circuit;
  }

  private buildShuffledCircuit(circuit) {
    let lowerRange = this.minReps;
    let upperRange = this.maxReps;

    let selectedExercises = []; // to avoid duplicates
    for (let suit of this.suits) {
      let exercise = suit.selectedExercise;
      if (exercise && exercise.id) {
        selectedExercises.push(exercise);
      }
    }

    for (let i = lowerRange; i <= upperRange; i++) {
      for (let suit of this.suits) {
        let rep = new ExerciseRepetition();

        if (suit.selectRandomExercise || suit.selectedExercise == null || suit.selectedExercise.name === '') {
          suit.selectedExercise = this.getRandomExercise(selectedExercises); // todo: could extend to search with ExerciseType
          selectedExercises.push(suit.selectedExercise);
        }
        let exerciseHistory = new ExerciseHistory();
        exerciseHistory.exercise = suit.selectedExercise;
        exerciseHistory.reps = 0;
        this.circuitHistory.set(suit.id, exerciseHistory);
        rep.exercise = suit.selectedExercise;

        rep.reps = i;
        rep.suit = suit;
        this.totalReps += i;
        this.totalSets += 1;
        circuit.push(rep);
      }
    }

    // Add wildcard reps?
    if (this.allowWildcards) {
      for (let suit of this.suits) {
        let rep = new ExerciseRepetition();
        rep.exercise = this.getRandomExercise([]);
        rep.isWildcard = true;

        rep.reps = this.rand(this.minReps, this.maxReps);
        rep.suit = suit;
        this.totalReps += rep.reps;
        this.totalSets += 1;
        circuit.push(rep);
      }
    }
    this.circuitToDo = this.shuffle(circuit);
  }

  rand(min: number, max: number): number {
    return (Math.random() * (max - min + 1) | 0) + min;
  }

  shuffle<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
      throw new TypeError('Expected an Array, got ${typeof array} instead.');
    }

    const oldArray = [...array];
    let newArray = new Array<T>();

    while (oldArray.length) {
      const i = Math.floor(Math.random() * oldArray.length);
      newArray = newArray.concat(oldArray.splice(i, 1));
    }

    return newArray;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  /**
   * Call this each time the user clicks they have done another rep
   */
  doNextRep() {
    // random message
    this.openSnackBar(this.shortMsgs[Math.floor(Math.random() * this.shortMsgs.length)].summary, '')
    let lastRepTimeTaken = 0
    // Completed one yet?
    if (this.currentRep) {
      this.repsCompleted += this.currentRep.reps
      this.setsCompleted += 1

      let history = this.circuitHistory.get(this.currentRep.suit.id)
      history.reps = this.currentRep.reps
      history.exercise = this.currentRep.exercise // it could be a wildcard so set it here as the reps exercise not the suits one
      let timeTaken = moment()
      history.timeTakenSecs = timeTaken.diff(this.repStartOn, 'seconds')
      lastRepTimeTaken = history.timeTakenSecs // For the end reporting of time
      history.completedOn = new Date()
      this.historyService.addHistory(history).subscribe(
        data => {
          return true;
        },
        error => {
          return observableThrowError(error);
        }
      )
    }

    // If done load the summary of the event
    if (this.circuitToDo.length == 1) {
      this.circuitComplete = true
      this.timer.dispose()
    }
    // small hack to get total time displayed at the end of the circuit, for some reason
    // the totalSecs keeps ticking
    this.thisCircuitTotalSecs = this.totalSecs + lastRepTimeTaken
    // Set the next one in the list as the current one gettin done
    this.currentRep = this.circuitToDo.shift()
    this.repSecs = 0
  }

  quitCircuit() {
    let dialogRef = this.dialog.open(QuitPromptComponent, {
      width: '250px',
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      if (result) {
        // Goto to the history page?
      }
    });
  }

  clearExercises() {
    for (let suit of this.suits) {
      this.clearExercise(suit)
    }
  }

  randomExercises() {
    let selectedExercises = [] // to avoid duplicates
    for (let suit of this.suits) {
      suit.selectedExercise = this.getRandomExercise(selectedExercises); // todo: could extend to search with ExerciseType
      selectedExercises.push(suit.selectedExercise)
    }
  }

  randomExercise(suit) {
    suit.selectedExercise = this.getRandomExercise([]);
  }

  getRandomExercise(excludeList) {
    //return this.http.get("http://localhost:5050/randomExercise/"
    let listLength = this.exerciseList.length - excludeList.length
    return _.difference(this.exerciseList, excludeList)[Math.floor(Math.random() * listLength)]

    //return this.exerciseList[Math.floor(Math.random() * this.exerciseList.length)]
  }

  clearExercise(suit) {
    suit.selectedExercise = new Exercise()
  }

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
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
