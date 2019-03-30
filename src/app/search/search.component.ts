import { Component, OnInit } from '@angular/core';
import { AppManagerService } from '../_services/app-manager.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private results = [];

  constructor(
    private appManager: AppManagerService,
    private http: HttpClient,
    private _router: Router
  ) { 
    
  }

  
  /* loginFacebook(){
    FB.login(
      (response)=> {
        console.log('submitLogin',response);
        if (response.authResponse)
        {
          this.appManager.setUser('Suchitha', 'suchithald@gmail.com');
          this.appManager.addAccount(response.authResponse["accessToken"]);
        }
        else
        {
          console.log('User login failed');
        }
      }, {
        scope: "user_posts"
      }
    );
  }

  search(event){
    event.preventDefault();
    const target = event.target;

    //Get search keywords
    const keywords: string = target.querySelector("#keywords").value.toLowerCase();
    let results;
    
    FB.api(
      "/me/feed?limit=100", //?fields=permalink_url
      (response) => {
        if (response && !response.error) {
          console.log(response);
          results = response.data;
          for (let post of results) {
            if (post.message == undefined) continue;
            let message: string = post.message.toLowerCase();
            if (message.includes(keywords)) {
              this.results.push(post.message)
            }
          }
          
          console.log(this.results);
          
        } else {
          
        }
      }
      );
      
      
    }
    
    logout(){
      console.log(FB.getAuthResponse())
  }
  
  
  ngOnInit() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId      : '380519256063506',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      
      FB.AppEvents.logPageView();   
      
    };
    
    (
      function(doc, script, fbSDK){
        var js, fjs = doc.getElementsByTagName(script)[0];
        if (doc.getElementById(fbSDK)) {
          return;
        }
        
        js = doc.createElement(script); js.id = fbSDK;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        
      }(document, 'script', 'facebook-jssdk')
      );
    } */


    ngOnInit(){

      const fields = ["lName"]
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
