import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/authentication.service';
import { AppManagerService } from '../_services/app-manager.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private appManager: AppManagerService,
    private _router: Router
  ) { }

  private fName: string;
  private lName: string;
  private email: string;
  private password: string;
  private cpass: string;


  login() {

    //Pass email and password to authentication service
    this._auth.authenticateUser(this.email, this.password)
      .subscribe(
        res => {
          console.log(res);

          //Save response token to local storage
          localStorage.setItem("token", res.token)
          this._router.navigate([""]);

        },
        err => console.log(err)
      )
  }

  registerUser() {

    if (this.password === this.cpass) {

      //Pass email and password for authentication to authentication service
      this._auth.registerUser(this.fName, this.lName, this.email, this.password)
        .subscribe(
          data => {
            window.alert(data.message);
            if (data.success) {
              this._router.navigate(["login"])
            }
          }
        );

    } else {
      window.alert("Passwords do not match!");
    }

  }
  ngOnInit() {

    if (this._auth.isLoggedIn()) {
      this._router.navigate([""]);
    }

  }

}
