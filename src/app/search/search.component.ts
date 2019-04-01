import { Component, OnInit } from '@angular/core';
import { AppManagerService } from '../_services/app-manager.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FacebookManagerService } from '../_services/facebook-manager.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private results = [];
  private keyword: string = "";

  constructor(
    private appManager: AppManagerService,
    private http: HttpClient,
    private _router: Router,
    private _fb: FacebookManagerService
  ) { 
    
  }

  
  loginFacebook() {
    const scope = "email, user_posts, user_photos, user_friends, user_videos"
    this._fb.login({scope})
  }

  search() {
    this._fb.search(
      this.keyword,
      res => this.results = res,
      err => console.log(err)
    )
    console.log(this.results)
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
