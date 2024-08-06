import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  log = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.log.email, this.log.password).subscribe(
        (response: { token: string; }) => {
          console.log('Login successful', response);
          if (response.token) {
            this.authService.setToken(response.token); // Store the token
            this.router.navigate(['/home']); // Redirect to home page
          } else {
            console.error('Login response does not contain a token');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
