import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  private webAuth = new auth0.WebAuth({
    clientID: 's26uiTeG79IUaO50yIhXwTfNlc3CWHZr',
    domain: 'sclhb.auth0.com',
    responseType: 'token id_token'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.webAuth.authorize({
      redirectUri: 'https://localhost:4200/accounts',
      connection: "twitter"
    })
  }

    private localLogin(authResult): void {
      // Set the time that the access token will expire at
      const expiresAt = (authResult.expiresIn * 1000) + Date.now();
      this._accessToken = authResult.accessToken;
      this._idToken = authResult.idToken;
      this._expiresAt = expiresAt;

    }

    public handleAuthentication(): void {
      this.webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          console.log(authResult)
          this.localLogin(authResult);
          //Set twitter access token in local storage
          localStorage.setItem("twitter", authResult.accessToken)
          this.router.navigate(['']);
        } else if (err) {
          this.router.navigate(['']);
          console.log(err);
        }
      });
    }

}
