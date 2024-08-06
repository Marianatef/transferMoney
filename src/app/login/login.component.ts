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
  errorMessage: string = ''; // To hold error messages
  isLoading: boolean = false; // To manage loading state

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.authService.login(this.log.email, this.log.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          if (response.token) {
            this.authService.setToken(response.token); // Store the token
            this.router.navigate(['/homelogin']); // Redirect to home page
            form.reset(); // Clear form fields on success
          } else {
            this.errorMessage = 'Login failed. Please try again.'; // Set error message
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed', error);
          this.errorMessage =
            error.error.message || 'An error occurred. Please try again.'; // Set error message
        },
        complete: () => {
          this.isLoading = false; // Ensure loading state is reset when request completes
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
