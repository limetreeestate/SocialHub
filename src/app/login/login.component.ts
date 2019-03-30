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

    private email: string;
    private password: string;


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

  ngOnInit() {

    if (this._auth.isLoggedIn()) {
      this._router.navigate([""]);
    }
    
  }

}
