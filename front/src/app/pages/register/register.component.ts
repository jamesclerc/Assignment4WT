import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  //register a user calling the endpoint /register set the token to the local storage and authomaticly login the user
  onRegisterClicked(email: string, password: string) {
    this.authService.registerUser({ email, password }).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/lists']);
    });
  }
}
