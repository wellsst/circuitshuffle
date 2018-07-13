import {Injectable} from '@angular/core';
import {Exercise, ExerciseHistory} from './model/model'
import * as moment from 'moment';
import * as _ from "lodash"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../environments/environment";


const MAX_BACKUPS = 10
const baseUrl = environment.serverUrl + '/exerciseHistory/';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {

    readonly listStorageKey = "reps.history"
    readonly idKey = "reps.history.id.key"

    // Placeholder for last id so we can simulate
    // automatic incrementing of id's
    lastId: number = 0;

    historyList//: ExerciseHistory[] = this.storage.retrieve(this.listStorageKey);

    todaySummary
    hours24Summary
    yesterdaySummary
    days3Summary
    weekSummary
    monthSummary
    yearSummary
    allSummary

    httpOptions = {
        headers: new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('token', this.authenticationService.username)
    };


    constructor(private http: HttpClient,
                private authenticationService: AuthService) {
        this.refreshHistories()
    }

    saveExercise(exercise) {
        let body = JSON.stringify(exercise);
        return this.http.post(baseUrl, body, this.httpOptions);
    }

    addHistory(history: ExerciseHistory) {

        /*
                let historyToPost = history

                historyToPost.exercise = null
                historyToPost.exercise = new Exercise()
                historyToPost.exercise.id = history.id
        */
        return this.http.post(baseUrl, JSON.stringify(history), this.httpOptions)

        /*if (!history.id) {
          history.id = ++this.lastId;
        }
        this.historyList.push(history);
        this.storage.store(this.listStorageKey, this.historyList);
        this.storage.store(this.idKey, this.lastId);
        return this;*/
    }


    refreshHistories() {
        return this.http.get(baseUrl, this.httpOptions)
        //return this.historyList;
    }

    getSummaryForAll(data): ExerciseHistory[] {
        return this.extractSummaryList(data);
    }

    getFor3Days(data): ExerciseHistory[] {
        return data.filter(
            history => moment(history.completedOn).isBetween(moment().subtract(3, 'days'), moment()))
    }


    getSummaryFor3Days(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getFor3Days(data));
    }


    getFor24Hours(data): ExerciseHistory[] {
        return data.filter(
            history => moment(history.completedOn).isBetween(moment().subtract(1, 'days'), moment()))
    }


    getSummaryFor24Hours(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getFor24Hours(data));
    }


    getForYesterday(data): ExerciseHistory[] {
        return data.filter(
            history => moment(history.completedOn).isSame(moment().subtract(1, 'days'), 'd'), moment())
    }

    getSummaryForYesterday(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getForYesterday(data));
    }

    getForToday(data): ExerciseHistory[] {
        return data.filter(
            history => moment(history.completedOn).isSame(moment(), 'd'), moment())
    }

    getForWeek(data): ExerciseHistory[] {
        return data.filter(
            history => moment(history.completedOn).isBetween(moment().subtract(7, 'days'), moment()))
    }

    getFor4Weeks(data): ExerciseHistory[] {
        let list = data.filter(
            history => moment(history.completedOn).isBetween(moment().subtract(4, 'weeks'), moment()))

        return list
    }

    getForThisYear(data): ExerciseHistory[] {
        // 2018-01-30T06:29:17.113Z
        let yearStart = moment().format('YYYY') + "-01-01"

        let list = data.filter(
            history => moment(history.completedOn).isBetween(moment(yearStart), moment()))

        return list
    }

    // Can just reuse a condensed list based on the same type
    getSummaryForThisYear(data): ExerciseHistory[] {
        let yearList = this.getForThisYear(data)
        console.log(yearList)
        console.log(_.groupBy(yearList, 'exercise.id'))

        var result = _.chain(yearList)
            .groupBy('exercise.id')
            .map((group, key) => ({key: group[0].exercise.name, val: _.sumBy(group, 'reps')}))
            .value()
        console.log(result)

        /*result =_.chain(yearList)
        .reduce((memo, obj) => {
            memo[obj.exercise.name = obj.reps] += obj.reps;
            return memo;
        }, {})
        .map((val, key) => ({key, val}))
        .value()*/

        console.log(result)
        // todo: Group by the exercise type and total up the reps+timeTaken
        return result
    }

    getSummaryFor4Weeks(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getFor4Weeks(data));
    }

    getSummaryForWeek(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getForWeek(data));
    }

    getSummaryForToday(data): ExerciseHistory[] {
        return this.extractSummaryList(this.getForToday(data));
    }

    protected extractSummaryList(historyList: ExerciseHistory[]) {
        var result = _.chain(historyList)
            .groupBy('exercise.id')
            .map((group, key) => ({key: group[0].exercise.name, val: _.sumBy(group, 'reps')}))
            .value()
        return result;
    }


    // Simulate DELETE /gidos/:id
    deleteHistoryById(id: number): HistoryService {
        this.historyList = this.historyList
            .filter(history => history.id !== id);
        return this;
    }

    // Simulate GET /gidos/:id
    getHistoryById(id: number): ExerciseHistory {
        return this.historyList
            .filter(history => history.id === id)
            .pop();
    }

}
