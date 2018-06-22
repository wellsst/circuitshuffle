import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {BehaviorSubject, Observable, Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {
  private tick: number;
  days: number;
  hours: number;
  mins: number;
  secs: number;

  @Input() totalSeconds: number;

  private subscription: Subscription;

  period = 1000
  timer

  constructor() {
  }

  ngOnInit() {
    this.timer = TimerObservable.create(1000, this.period);
    this.subscription = this.timer.
    subscribe(t => {
      this.totalSeconds += (this.period / 1000)
      this.tick = t;
      this.days = Math.floor(t / 86400)
      t -= this.days * 86400
      this.hours = Math.floor(t / 3600) % 24
      t -= this.hours * 3600
      this.mins = Math.floor(t / 60) % 60
      t -= this.mins * 60
      this.secs = t % 60
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    console.log(log.join(', '))
    //this.changeLog.push(log.join(', '));
  }

  reset() {
    console.log("Restting timer)")
    this.totalSeconds = 0
    this.timer = TimerObservable.create(1000, this.period);
    this.subscription = this.timer.
    subscribe(t => {
      this.totalSeconds += (this.period / 1000)
      this.tick = t;
      this.days = Math.floor(t / 86400)
      t -= this.days * 86400
      this.hours = Math.floor(t / 3600) % 24
      t -= this.hours * 3600
      this.mins = Math.floor(t / 60) % 60
      t -= this.mins * 60
      this.secs = t % 60
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
