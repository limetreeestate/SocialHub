import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private name: string

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { 
    
  }

  ngOnInit(){

    const fields = ["fName"]
    this.http.post("http://localhost:8080/api/verify", {fields}).subscribe(
      res => {

        if (!(res instanceof HttpErrorResponse)) this.name = res["fName"].toString()
        else {
          localStorage.removeItem("token")
          console.log("Invalid token")
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
