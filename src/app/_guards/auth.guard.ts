import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 
 * Guard for pages that require authentication first
 * 
 */
export class AuthGuard implements CanActivate {
  
  constructor (
    private _auth: AuthService,
    private _router: Router
  ) {}

  //Activate only if logged in
  canActivate() {
    if (!this._auth.isLoggedIn()) {
      
      this._router.navigate(["login"])
      return false

    } else return true
  }
}
