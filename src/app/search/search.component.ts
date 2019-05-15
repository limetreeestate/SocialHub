import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { FacebookManagerService } from '../_services/facebook-manager.service';
import { AuthService } from '../_services/authentication.service';
import { YouTubeService } from '../_services/you-tube.service';
import { FilterProfile } from '../_models/FilterProfile';

interface Results {
  [key: string]: [any]
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  private results: Results = {};
  private keyword: string = "";
  hasYouTube = false
  objectKeys = Object.keys

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _fb: FacebookManagerService,
    private _youtube: YouTubeService,
    private _auth: AuthService
  ) {

  }

  search(filter: FilterProfile) {
    if (filter.facebook.show) {
      this._fb.search(
        this.keyword,
        res => {
          this.results.Facebook = res
          console.log(this.results)
        },
        err => console.log(err)
      )
    }

    if (filter.twitter.show) {

    }

    if (filter.youtube.show) {
      this._youtube.search(this.keyword, filter.youtube,
        res => {
          this.results.YouTube = res
          console.log(this.results.YouTube)
          this.hasYouTube = true
        })
    }
    /* const query = this.keyword
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this._auth.getToken("twitter")}`)
    
    let params = new HttpParams()
    params = params.append("query", query)
    this.http.post("https://api.twitter.com/1.1/search/tweets.json", {query}).subscribe(
      res => this.results = res,
      err => console.log(err)
    ) */

  }

  hasResults(media: string) {
    return !!this.results[media]
  }


  ngOnInit() {

    const fields = ["filterProfiles"]
    this.http.post("https://localhost:8080/api/verify", { fields }).subscribe(
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
