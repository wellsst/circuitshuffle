
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import "rxjs-compat/add/operator/map";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * Derived from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public token: string;
    public username: string;
    public error: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.username = currentUser && currentUser.username;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(environment.serverUrl + '/login/',
            JSON.stringify({username: username, password: password}), httpOptions).
            map((response: any) => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;

                if (token) {
                    // set token property
                    this.token = token;
                    this.username = username

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });

        /*this.http.post('http://localhost:8080/login/login',
            JSON.stringify({ username: username, password: password }), httpOptions)
            .subscribe(
            response => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            },
            error => {
                console.error("Error logging in: " + error);
                return Observable.throw(error);
            }
        )*/

        /*return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });*/
    }


    signup(emailAddress: string): Observable<boolean> {
        return this.http.post(environment.serverUrl + '/signup',
            JSON.stringify({emailAddress: emailAddress}), httpOptions).pipe(
            map((response: any) => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;

                if (token) {
                    // set token property
                    this.token = token;
                    this.username = emailAddress

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({username: emailAddress, token: token}));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                  this.error = response
                    return false;
                }
            }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
