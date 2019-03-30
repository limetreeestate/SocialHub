import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  
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
  