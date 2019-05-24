import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { FacebookManagerService } from '../_services/facebook-manager.service';
import { AuthService } from '../_services/authentication.service';
import { YouTubeService } from '../_services/you-tube.service';
import { FilterProfile } from '../_models/FilterProfile';
import { TwitterService } from '../_services/twitter.service';

interface Results {
  [key: string]: [any]
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  results: Results = {};
  keyword: string = "";
  hasYouTube = false
  objectKeys = Object.keys

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _fb: FacebookManagerService,
    private _youtube: YouTubeService,
    private _twitter: TwitterService,
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
      this.results.Twitter = ['']
      this._twitter.search(
        this.keyword,
        filter.twitter,
        (res) => {
          this.results.Twitter = res
          console.log(res)
          let tweetContainer = document.getElementById('tweet-container')
          tweetContainer.innerHTML = ""
          console.log(tweetContainer)
          tweetContainer.style.display = 'block';
          res.forEach(element => {
            (window as any).twttr.widgets.createTweet(element.id_str, tweetContainer,
              {
              })
          });
          console.log(res)
        }
      )
    }

    if (filter.youtube.show) {
      this._youtube.search(
        this.keyword,
        filter.youtube,
        res => {
          this.results.YouTube = res
          console.log(this.results.YouTube)
          this.hasYouTube = true
        })
    }

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
