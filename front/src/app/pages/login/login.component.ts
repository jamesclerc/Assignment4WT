import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  //login the user by calling the backend endpoint /login set the token inside the local storage
  onLoginButtonClicked(email: string, password: string) {
    this.authService.loginUser({ email, password }).subscribe((res) => {
      if (res.token != undefined) {
        // we have logged in successfully
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      }
    });
  }
}
