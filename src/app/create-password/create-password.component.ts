import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css',
})
export class CreatePasswordComponent {
  constructor(private location: Location) {}
  Re_enter = {
    Password: '',
    ConfirmPassword: '',
  };
  onSubmit(form: NgForm) {
    console.log(form);
  }
  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }
}
// export const routes: Routes = [
//   {
//       path:'app-creat-password',
//       component:CreatPasswordComponent,
//   },]
