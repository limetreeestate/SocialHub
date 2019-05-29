import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './authentication.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

declare var twttr: any;

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(
    private http: HttpClient,
    private _auth: AuthService
  ) {
    this.init()
  }

  init() {
    (window as any).twttr = (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = (window as any).twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));
    console.log("Twitter widget initialized")
  }

  search(keywords: string, filter): Observable<any> {
    let filterNew = Object.assign({}, filter)
    delete filterNew.show

    filterNew.fromDate = new DatePipe("en-US").transform(filterNew.fromDate, "yyyyMMddhhmm") //Transform dates into formats required by the Search API
    filterNew.toDate = new DatePipe("en-US").transform(filterNew.toDate, "yyyyMMddhhmm") //Transform dates into formats required by the Search API
    const params = { ...{ query: keywords }, ...filterNew }

    const header = new HttpHeaders()
    header.append('Content-Type', 'application/X-www-form-urlencoded')
    return this.http.post("/api/twitter/search", params, { headers: header })
  }
}
//2221757044785548
//129417183848258
//17841401395219715