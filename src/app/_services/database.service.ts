import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**Login response interface */
interface LoginData {
  success: boolean;
  message: String;
  user: JSON;
}

/**Register response interface */
interface RegisterData {
  success: boolean;
  message: String;
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

  constructor(private http: HttpClient) { }

  authenticateUser(email: String, password: String) {
    //authenticate user by login credentials
    
    //Send email and password to backend server through POST
    return this.http.post<LoginData>("/api/login", {
      email,
      password
    });
  }
  
  registerUser(
    fName:String, 
    lName: String, 
    email: String, 
    password: String
    ) {
    //register user by given credentials

    //Send email and password to backend server through POST
    return this.http.post<RegisterData>("/api/register", {
      fName, 
      lName,
      email,
      password
    });
    
  }
}
