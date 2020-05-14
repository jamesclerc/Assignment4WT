import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
//auth guard prevent the user to access some route the canActivate return true if the user is logged In
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private route : Router) { }

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}	