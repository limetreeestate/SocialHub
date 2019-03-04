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
    const email: String = target.querySelector("#email").value
    const password: String = target.querySelector("#password").value
    const cpass: String = target.querySelector("#cpass").value

    if (password === cpass){

      //Pass email and password for authentication to Database service
      this.database.registerUser(email, password).subscribe(
        data => {
          console.log(data)
        }
      );

    } else {
      window.alert("Passwords do not match!");
    }

  }

}
