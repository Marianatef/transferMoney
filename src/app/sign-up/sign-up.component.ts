import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

interface BirthDate {
  day: string;
  month: string;
  year: string;
}

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  birthDate: BirthDate; // Keep as a structured object
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user: User = {
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: {
      day: '',
      month: '',
      year: '',
    },
    gender: '',
    country: '',
  };

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  years: number[] = Array.from(
    { length: 25 },
    (_, i) => new Date().getFullYear() - i
  );

  errorMessage: string = ''; // To hold error messages
  isLoading: boolean = false; // To manage loading state

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router // Inject Router
  ) {}

  onSubmit(form: NgForm) {
    this.errorMessage = ''; // Clear any previous error messages

    if (form.valid) {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      if (
        !this.isValidDate(
          +this.user.birthDate.day,
          +this.user.birthDate.month,
          +this.user.birthDate.year
        )
      ) {
        this.errorMessage = 'Invalid birth date!';
        return;
      }

      // Format birthDate to 'YYYY-MM-DD'
      const formattedBirthDate = `${
        this.user.birthDate.year
      }-${this.user.birthDate.month.padStart(
        2,
        '0'
      )}-${this.user.birthDate.day.padStart(2, '0')}`;

      const registrationData = {
        ...this.user,
        birthDate: formattedBirthDate, // Use the formatted date
      };

      this.isLoading = true; // Set loading state to true

      this.authService.register(registrationData).subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);
          this.isLoading = false; // Set loading state to false
          form.reset();
          this.router.navigate(['/login']); // Navigate to login page
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          this.errorMessage =
            error.error.message || 'Registration failed. Please try again.';
          this.isLoading = false; // Set loading state to false
        },
        complete: () => {
          // Optionally handle completion
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  private isValidDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }
}
