import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { UserAccount } from '../_models/UserAccount';
import { FilterProfile } from '../_models/FilterProfile';

@Injectable({
  providedIn: 'root'
})

//Use this class to mainly act as a mediator for the user class
export class AppManagerService {

  //App id given by Facebook
  private appID: String;

  private user: User;
  private activeFilterProfile: FilterProfile;

  constructor() {
    this.appID = "";
    this.user = null;
  }

  public setUser(name: String, email: String) {
    this.user = new User(name, email);
  }

  public getUserName() {
    return this.user.getName();
  }

  public addAccount(accessToken: String) {
    this.user.addAccount(accessToken);
  }

  public addFilterProfile(profile: FilterProfile) {
    this.user.getFilterProfiles().push(profile);
  }

  public search(keywords: String) {
    /*search accross all of the user's accounts and filter
    using active filter profile*/
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }

  public logout() {
    this.user = null;
  }


}
