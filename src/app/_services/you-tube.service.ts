import { Injectable, OnInit } from '@angular/core';

declare var gapi: any

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  private GoogleAuth: any // Google Auth object.
  constructor() {
    setTimeout(() => this.initClient(), 1000)
    //this.GoogleAuth = gapi.auth2.getAuthInstance()
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
    
    search(keywords: string, callback) {
      if (true) {
        //Initialize API request
        let request = gapi.client.youtube.search.list({
          'part': 'snippet',
          'q': keywords,
          "maxResults": 20
        });
        console.log("ASDDD")
        // Execute the API request.
        request.execute((res) => {
          callback(res)
        });
      }
    }
    
  login() {
      let res = this.GoogleAuth.signIn()
      console.log(res)
  }
}
