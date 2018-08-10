import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../environments/environment';

const baseUrl = environment.serverUrl + '/exerciseSet/';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetService {

  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('token', this.authenticationService.username)
  };

  constructor(private http: HttpClient,
              private authenticationService: AuthService) { }

  save(exerciseSet) {
    let body = JSON.stringify(exerciseSet);
    return this.http.post(baseUrl, body, this.httpOptions);
  }

  getList() {
    return this.http.get(baseUrl, this.httpOptions);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`, this.httpOptions);
  }
}
