import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    constructor(private router: Router,
                private authenticationService: AuthService) {
    }

    ngOnInit() {
    }

    signup() {

        this.loading = true;
        console.log("Logging in")
        this.authenticationService.signup(this.model.username)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    console.log("Signup ok user is: " + this.authenticationService.username)
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
