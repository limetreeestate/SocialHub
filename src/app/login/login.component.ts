import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  ngOnInit() {
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
        console.log(data)
      }
    )
  }

}
