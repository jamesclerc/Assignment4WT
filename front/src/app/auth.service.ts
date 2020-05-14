import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = 'http://localhost:8080/user/register';
  private _loginUrl = 'http://localhost:8080/user/login';
  constructor(private http: HttpClient, private _router: Router) {}

  //register a user
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  //login a user
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  //return true if the user is logged in
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  //get the token from the localstorage
  getToken() {
    return localStorage.getItem('token');
  }

  //logout the user by removing the token from the local storage redirect the user to /login
  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
