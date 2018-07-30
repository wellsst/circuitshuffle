import {Injectable} from '@angular/core';
import {Exercise} from './model/model'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
//import {EXERCISE_LIST} from './model/seed-data'

import * as _ from 'lodash'
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root',
})
export class ExerciseLookupService {

  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('token', this.authenticationService.username)
  };

  exerciseList

  constructor(private http: HttpClient, private authenticationService: AuthService) {
    /*this.http.get(environment.serverUrl +  "/exercise/").subscribe(
        data => {
            this.exerciseList = data
        },
        err => console.error(err),
        () => console.log('done loading exercise list: ' + this.exerciseList)
    )*/
  }

  getExerciseList(query) {

    //return this.http.get("http://localhost:5050/exercise/" + query)
    // console.log(this.exerciseList)
    if (query) {
      return this.exerciseList.filter(exercise => exercise.name.toLowerCase().startsWith(query.toLowerCase()));
    } else {
      return this.exerciseList
    }
  }

  getList() {
    return this.http.get(environment.serverUrl + "/exercise/")
  }

  getTargetAreasList() {
    return this.http.get(environment.serverUrl + "/exerciseTypes/")
  }

  getRandomExercise(excludeList) {
    //return this.http.get("http://localhost:5050/randomExercise/"
    let listLength = this.exerciseList.length - excludeList.length
    return _.difference(this.exerciseList, excludeList)[Math.floor(Math.random() * listLength)]

    //return this.exerciseList[Math.floor(Math.random() * this.exerciseList.length)]
  }

  saveExercise(exercise: Exercise) {
    return this.http.post(environment.serverUrl + "/exercise/", JSON.stringify(exercise), this.httpOptions)
  }

  delete(id) {
    return this.http.delete(environment.serverUrl + "/exercise/" + id, this.httpOptions)
  }
}
