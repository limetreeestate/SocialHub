import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { FacebookManagerService } from '../_services/facebook-manager.service';
import { AuthService } from '../_services/authentication.service';
import { YouTubeService } from '../_services/you-tube.service';
import { FilterProfile } from '../_models/FilterProfile';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private results :any = [];
  private keyword: string = "";

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _fb: FacebookManagerService,
    private _youtube: YouTubeService,
    private _auth: AuthService
  ) { 
    
  }

  search(filter: FilterProfile) {
    this._fb.search(
      this.keyword,
      res => this.results = res,
      err => console.log(err)
    )
    /* const query = this.keyword
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this._auth.getToken("twitter")}`)
    
    let params = new HttpParams()
    params = params.append("query", query)
    this.http.post("https://api.twitter.com/1.1/tweets/search/30day/sclhb.json", {query}).subscribe(
      res => this.results = res,
      err => console.log(err)
    ) */
    this._youtube.search(this.keyword, filter.youtube,
      res => console.log(res))
    /* const params: string = [
      `q=${this.keyword}`,
      `key=AIzaSyBD2KPo91Xl3B6mli7ueSvjh_cCeRIfCvw`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&')
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
    const queryUrl = `${YOUTUBE_API_URL}?${params}`
    this.http.get(queryUrl).subscribe(
      res => console.log(res),
      err => console.log(err)
    ) */

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
