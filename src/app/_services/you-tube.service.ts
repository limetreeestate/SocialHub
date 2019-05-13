import { Injectable, OnInit } from '@angular/core';

declare var gapi: any

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  private GoogleAuth: any // Google Auth object.
  constructor() {
    setTimeout(() => this.initClient(), 1000)
  }

  private isAuthorized: boolean


  //initialize google API to variable
  private initClient() {
    console.log("init")
    //Credentials
    const config = {
      'apiKey': 'AIzaSyDnn0iIqQtWnId8zjaZN_gTRTtRLgTtXlc',
      'clientId': '215570320494-glh46fvgrm5fuqd5897jejg1vff407mf.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/youtube.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }

    //Initialize Google API client object
    gapi.client.init(config).then(() => {
      this.GoogleAuth = gapi.auth2.getAuthInstance()

      // Listen for sign-in state changes.
      this.GoogleAuth.isSignedIn.listen(() => {
        this.isAuthorized = true
        console.log(this.isAuthorized)
      })
    })
  }

  ISODateString(d) {
    console.log()
    function pad(n) { return n < 10 ? '0' + n : n }
    return d.getUTCFullYear() + '-'
      + pad(d.getUTCMonth() + 1) + '-'
      + pad(d.getUTCDate()) + 'T'
      + pad(d.getUTCHours()) + ':'
      + pad(d.getUTCMinutes()) + ':'
      + pad(d.getUTCSeconds()) + 'Z'
  }


  search(keywords: string, filter, successCallback) {
    //default parameters
    let params = {
      'part': 'snippet',
      'q': keywords,
      'type': 'video',
      "maxResults": 20
    }
    //Edit filter data params
    delete filter.show
    filter.publishedBefore = this.ISODateString(filter.publishedBefore)
    filter.publishedAfter = this.ISODateString(filter.publishedAfter)
    //Combine with filter parameters
    params = { ...params, ...filter }
    console.log(params)
    //Initialize API request
    let request = gapi.client.youtube.search.list(params);
    console.log("ASDDD")
    // Execute the API request.
    request.execute(
      (res) => successCallback(res)
    );
  }

  login() {
    let res = this.GoogleAuth.signIn()
    console.log(res)
  }
}
