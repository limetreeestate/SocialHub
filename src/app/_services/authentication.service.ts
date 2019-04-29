import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Login response interface */
interface LoginData {
  success: boolean;
  message: string;
  user: JSON;
}

/**Register response interface */
interface RegisterData {
  success: boolean;
  message: string;
}


/***
 * Service to handle calls to database
 * 
 * 
 * 
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginURL: string = "http://localhost:8080/api/login"
  private _registerURL: string = "http://localhost:8080/api/register"

  constructor(private http: HttpClient) { }

  
  //authenticate user by login credentials
  authenticateUser(email: string, password: string) :Observable<any>{
    
    //Send email and password to backend server through POST
    return this.http.post<any>(this._loginURL, {
      email,
      password
    });
  }
  
  registerUser(
    fName:string, 
    lName: string, 
    email: string, 
    password: string
    ) : Observable<any>{
    //register user by given credentials

    //Send email and password to backend server through POST
    return this.http.post<RegisterData>(this._registerURL, {
      fName, 
      lName,
      email,
      password
    });
    
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token")
  }

  getToken(tokenName: string): string {
    return localStorage.getItem(tokenName)
  }
}
