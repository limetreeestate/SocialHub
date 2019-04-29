import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FacebookManagerService } from '../_services/facebook-manager.service';
import { Auth0Service } from '../_services/auth0.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _fb: FacebookManagerService,
    private _auth0: Auth0Service
  ) { 
    _auth0.handleAuthentication()
  }

  loginTwitter(){
    this._auth0.login()
  }

  searchTwitter(){
    let token = this._auth0.accessToken;
    
  }

  

  ngOnInit(){

    const fields = ["filterProfiles"]
    this.http.post("http://localhost:8080/api/verify", {fields}).subscribe(
      res => {
  
        if (res instanceof HttpErrorResponse) {
          localStorage.removeItem("token")
          window.alert("Invalid token")
          this._router.navigate(["login"])
        }
        
      },
      err => {
        console.log(err)
        localStorage.removeItem("token")
        this._router.navigate(["login"])
      }
    )
    
  }

}
