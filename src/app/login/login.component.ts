import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.log.email, this.log.password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.authService.setToken(response.token); // Store the token
          this.router.navigate(['/home']); // Redirect to home page
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
