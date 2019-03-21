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

  registerUser(event) {
    event.preventDefault()
    const target = event.target

    //Get entered email and password from the event
    const fName: String = target.querySelector("#fName").value
    const lName: String = target.querySelector("#lName").value
    const email: String = target.querySelector("#email").value
    const password: String = target.querySelector("#password").value
    const cpass: String = target.querySelector("#cpass").value

    if (password === cpass){

      //Pass email and password for authentication to Database service
      this.database.registerUser(fName, lName, email, password).subscribe(
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
