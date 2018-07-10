import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthService,
              public snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout()
    this.router.navigate(['/'])
    this.openSnackBar("You have been logged out of Circuit Shuffle", null)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
