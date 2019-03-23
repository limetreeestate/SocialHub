import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  private fName: string;
  private lName: string;
  private email: string;
  private password: string;
  private cpass: string;

  registerUser() {

    if (this.password === this.cpass){

      //Pass email and password for authentication to authentication service
      this._auth.registerUser(this.fName, this.lName, this.email, this.password)
        .subscribe(
          data => {
            window.alert(data.message);
            if (data.success) {
              
            }
          }
        );

    } else {
      window.alert("Passwords do not match!");
    }

  }

}
