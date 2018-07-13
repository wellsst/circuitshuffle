import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material";

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
              public snackBar: MatSnackBar,
              private authenticationService: AuthService) {
  }

  ngOnInit() {
  }

  signup() {
    this.loading = true;
    this.authenticationService.signup(this.model.username)
      .subscribe(result => {
        if (result === true) {
          // login successful
          console.log("Signup ok user is: " + this.authenticationService.username)
          this.openSnackBar(`You're now signed up! You can start right away. All you need to know was sent to: ${this.authenticationService.username}`, '')
          this.router.navigate(['/']);
        } else {
          // login failed
          this.openSnackBar(this.authenticationService.error, '')
          //console.log(this.authenticationService.error)
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this.openSnackBar(error.error + "", '')
        console.log(error.error );
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
