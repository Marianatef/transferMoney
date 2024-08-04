import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  currentSection: string = 'profile';
  settingsTab: string = 'profile';

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.updateTitle('My Account');
    this.headerService.updateBreadcrumb(['Home', 'My Account']);
  }

  setSection(section: string) {
    this.currentSection = section;
    if (section === 'settings') {
      this.settingsTab = 'profile';
    } else if (section === 'change-password') {
      this.currentSection = 'settings';
      this.settingsTab = 'change-password';
    }
  }
  userProfile = {
    username: 'Jonathon',
    lastName: 'Smith',
    phone: '+880125412624',
    email: 'jhonathonsmith@gmail.com',
    balance: 1000
  };

  changePassword = {
    current: '',
    new: '',
    confirm: '',
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
    console.log('Profile updated:', this.userProfile);
  }

  changeUserPassword(): void {
    if (this.changePassword.new === this.changePassword.confirm) {
      console.log('Password changed:', this.changePassword.new);
    } else {
      console.error('Passwords do not match');
    }
  }
}
