import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/database.service';
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
    private database: DatabaseService,
    private appManager: AppManagerService,
    private _router: Router
    ) { }

    private email: string;
    private password: string;


  login() {

    //Pass email and password for authentication to Database service
    this.database.authenticateUser(this.email, this.password)
      .subscribe(
        data => {
          window.alert(data.message);
          if (data.success) {

            console.log(this.appManager.isLoggedIn());

            //Create user object in app manager
            this.appManager.setUser(data["lName"], data["email"]);

            //Add saved filter profiles to user object
            this.appManager.addFilterProfile(data["filterProfiles"]);
            console.log(this.appManager.isLoggedIn());
            
            //redirect to home
            if (this.appManager.isLoggedIn()){
              this._router.navigate([""]);
            }

          }
        }
      )
  }

  ngOnInit() {

    if (this.appManager.isLoggedIn()) {
      this._router.navigate(["home"]);
    }
    
  }

}
