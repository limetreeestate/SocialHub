import { Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
      'apiKey': 'AIzaSyDuLRdU5WqZ9u6Hr_dR9blraG1MKn_BoI0',
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
      "maxResults": 50
    }
    //Edit and remove unnecessary filter data params
    let filterNew = Object.assign({}, filter)
    delete filterNew.channel
    delete filterNew.show
    filterNew.publishedBefore = this.ISODateString(filterNew.publishedBefore) //Transform dates into formats required by the YT Data API
    filterNew.publishedAfter = this.ISODateString(filterNew.publishedAfter)
    //Channel title parameter to lowercase and whitespaces stripped
    const channelTitle: string = filter.channel.toLowerCase().replace(/ /g, '')
    //Combine with filter parameters
    params = { ...params, ...filterNew }
    //Initialize API request
    let request = gapi.client.youtube.search.list(params);
    // Execute the API request.
    request.execute(
      (res) => {
        let items = res.items
        let results = []
        //retrieve the required fields
        items.forEach(element => {
          const snippet = element.snippet
          
          const title: string = snippet.title 
          const channel: string = snippet.channelTitle 
          const date: string = snippet.publishedAt 
          const thumbnail: string = snippet.thumbnails.medium.url
          const description: string = snippet.description
          const url: string = `https://www.youtube.com/watch?v=${element.id.videoId}`
          //Channel title result to lowercase and whitespace stripped
          const temp: string = channel.toLowerCase().replace(/ /g, '')
          //Check if channel titles match
          if (channelTitle == "" || temp.includes(channelTitle)) {
            //Push desired fields into array
            results.push({
              title,
              channel,
              date,
              thumbnail,
              description,
              url
            })
          }
        });
        //Callback with results array
        successCallback(results)
      }
      );
    }
    
  login() {
    let res = this.GoogleAuth.signIn()
    console.log(res)
  }
}
