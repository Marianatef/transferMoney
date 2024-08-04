import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { fail } from 'node:assert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  user = {
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    brithDate: '',
  };
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
