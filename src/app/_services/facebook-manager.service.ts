import { Injectable, OnInit } from '@angular/core';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})


export class FacebookManagerService  {


  constructor() {
    this.init()
  }

  init() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '380519256063506',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v3.2'
      })
    }
    
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))
  }

  login(scope: object){
    FB.login(
      (res) => {
      if (res.status == "connected") console.log(res)
      else window.alert("error")
      },
      scope
    )
  }

  logout() {
    FB.logout((res) => {
      console.log(res)
    })
  }

  search(keywords: string, successCallback: any, errCallback): any {
    //Get search keywords
    let results = [];
    
    FB.api(
      "me?fields=feed.limit(100){attachments{url},message}", //?fields=permalink_url
      (response) => {
        if (response && !response.error) {
          console.log(response);
          for (let post of response.feed.data) {
            if (post.message == undefined) continue;
            let message: string = post.message.toLowerCase();
            if (message.includes(keywords)) {
              results.push([post.message, post.attachments == undefined? null: post.attachments.data[0].url])
            }
          }
          
          console.log(results);
          successCallback(results);
          
        } else {
          errCallback(response.error)
        }
      }
      );
  }


  
}
