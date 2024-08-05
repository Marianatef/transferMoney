import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  birthDate: BirthDate;
  gender: string;
  country: string;
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

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.user.password !== this.user.confirmPassword) {
        console.error('Passwords do not match!');
        return;
      }

      // Format birthDate
      const formattedBirthDate = `${
        this.user.birthDate.year
      }-${this.user.birthDate.month.padStart(
        2,
        '0'
      )}-${this.user.birthDate.day.padStart(2, '0')}`;

      const registrationData = {
        ...this.user,
        birthDate: formattedBirthDate,
      };

      console.log('Sending registration data:', registrationData);

      this.authService.register(registrationData).subscribe(
        (response: any) => {
          console.log('Registration successful', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          console.error('Error details:', error.error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
