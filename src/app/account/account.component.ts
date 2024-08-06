import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.headerService.updateTitle('My Account');
    this.headerService.updateBreadcrumb(['Home', 'My Account']);

    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.userService.getUserDetails().subscribe({
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
    this.userProfile.phone = user.phone || '';
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
    console.log('Profile updated:', this.userProfile);
    // Implement the update profile logic here
  }

  changeUserPassword(): void {
    if (this.changePassword.new === this.changePassword.confirm) {
      console.log('Password changed:', this.changePassword.new);
      // Implement the password change logic here
    } else {
      console.error('Passwords do not match');
    }
  }
}
