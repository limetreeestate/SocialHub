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
    private router: Router
    ) { }

  ngOnInit() {

    if (this.appManager.isLoggedIn()) {
      this.router.navigate(["home"]);
    }
    
  }

  login(event) {
    event.preventDefault()
    const target = event.target

    //Get entered usename and password from the event
    const email: String = target.querySelector("#email").value
    const password: String = target.querySelector("#password").value

    //Pass email and password for authentication to Database service
    this.database.authenticateUser(email, password).subscribe(
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
            this.router.navigate([""]);
          }

        }
      }
    )
  }

}
