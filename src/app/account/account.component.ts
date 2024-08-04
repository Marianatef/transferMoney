import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  currentSection: string = 'profile';
  settingsTab: string = 'profile';

  // Method to change the section
  setSection(section: string): void {
    this.currentSection = section;
  }

  userProfile = {
    username: 'Jonathon',
    lastName: 'Smith',
    phone: '+880125412624',
    email: 'jhonathonsmith@gmail.com'
  };

  changePassword = {
    current: '',
    new: '',
    confirm: ''
  };

  payments = [
    {
      accountNumber: '6785 4987 6543',
      amount: 1000,
      recipientName: 'Jonathon Smith',
    },
    {
      accountNumber: '6785 4987 6543',
      amount: 1000,
      recipientName: 'Jonathon Smith',
    },
  ];

  setSettingsTab(tab: string): void {
    this.settingsTab = tab;
  }

  updateProfile(): void {
    // Logic to update profile
    console.log('Profile updated:', this.userProfile);
  }

  changeUserPassword(): void {
    // Logic to change user password
    if (this.changePassword.new === this.changePassword.confirm) {
      console.log('Password changed:', this.changePassword.new);
    } else {
      console.error('Passwords do not match');
    }
  }
}
