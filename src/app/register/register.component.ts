import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  ngOnInit() {
  }

  private fName: string;
  private lName: string;
  private email: string;
  private password: string;
  private cpass: string;

  registerUser() {

    if (this.password === this.cpass){

      //Pass email and password for authentication to Database service
      this.database.registerUser(this.fName, this.lName, this.email, this.password)
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
