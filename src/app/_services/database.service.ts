import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  //authenticate user by login credentials
  authenticateUser(email: String, password: String) {

    //Send email and password to backend server through POST
    return this.http.post("/api/login", {
      email,
      password
    });
  }
  
  registerUser(email: String, password: String) {

    //Send email and password to backend server through POST
    return this.http.post("/api/register", {
      email,
      password
    });
  }
}
