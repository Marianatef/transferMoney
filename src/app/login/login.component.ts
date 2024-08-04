import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  log = {
    email: '',
    password: '',
  };
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
// export const routes: Routes = [
//   {
//       path:'Login',
//       component:LoignComponent,
//   },]
