import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
export class DatabaseService {

  private _loginURL: string = "http://localhost:8080/api/login"
  private _registerURL: string = "http://localhost:8080/api/register"

  constructor(private http: HttpClient) { }

  authenticateUser(email: string, password: string) {
    //authenticate user by login credentials
    
    //Send email and password to backend server through POST
    return this.http.post<LoginData>(this._loginURL, {
      email,
      password
    });
  }
  
  registerUser(
    fName:string, 
    lName: string, 
    email: string, 
    password: string
    ) {
    //register user by given credentials

    //Send email and password to backend server through POST
    return this.http.post<RegisterData>(this._registerURL, {
      fName, 
      lName,
      email,
      password
    });
    
  }
}
