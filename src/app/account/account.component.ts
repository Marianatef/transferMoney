import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth.service'; // Updated to AuthService
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], // Corrected styleUrls property name
})
export class AccountComponent implements OnInit {
  currentSection: string = 'profile';
  settingsTab: string = 'profile';
  user: any = {}; // Initialize user as an empty object

  userProfile = {
    fullName: '',
    username: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
    gender: '',
  };

  changePassword = {
    current: '',
    new: '',
    confirm: '',
  };

  payments = [
    {
      accountNumber: '',
      amount: 0,
      recipientName: '',
    },
    {
      accountNumber: '',
      amount: 0,
      recipientName: '',
    },
  ];

  constructor(
    private headerService: HeaderService,
    private authService: AuthService // Updated to AuthService
  ) {}

  ngOnInit(): void {
    this.headerService.updateTitle('My Account');
    this.headerService.updateBreadcrumb(['Home', 'My Account']);

    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.updateUserProfile(user);
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      },
    });
  }

  updateUserProfile(user: any): void {
    this.userProfile.fullName = user.fullName || '';
    this.userProfile.username = user.username || '';
    this.userProfile.lastName = user.lastName || '';
    this.userProfile.phone = user.phoneNumber || '';
    this.userProfile.email = user.email || '';
    this.userProfile.balance = user.balance || 0;
    this.userProfile.gender = user.gender || '';
  }

  setSection(section: string): void {
    this.currentSection = section;
    if (section === 'settings') {
      this.settingsTab = 'profile';
    } else if (section === 'change-password') {
      this.currentSection = 'settings';
      this.settingsTab = 'change-password';
    }
  }

  setSettingsTab(tab: string): void {
    this.settingsTab = tab;
  }

  updateProfile(): void {
    this.authService.updateUser(this.userProfile).subscribe({
      next: (response: any) => {
        console.log('Profile updated successfully:', response);
        // Optionally, show a success message to the user
      },
      error: (error: HttpErrorResponse) => {
        console.error('Profile update failed:', error.message);
        // Optionally, show an error message to the user
      },
    });
  }

  // changeUserPassword(): void {
  //   if (this.changePassword.new === this.changePassword.confirm) {
  //     this.authService.updatePassword({
  //       currentPassword: this.changePassword.current,
  //       newPassword: this.changePassword.new,
  //     }).subscribe({
  //       next: (response: any) => {
  //         console.log('Password changed successfully:', response);
  //         // Optionally, show a success message to the user
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.error('Password change failed:', error.message);
  //         // Optionally, show an error message to the user
  //       },
  //     });
  //   } else {
  //     console.error('Passwords do not match');
  //     // Optionally, show an error message to the user
  //   }
  // }
}
