import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service'; // Adjust the import path

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  currentStep: number = 1;
  amount: number = 1000;
  recipientAmount: number = 48422.0;
  selectedSendCurrency: string = 'USD';
  selectedReceiveCurrency: string = 'EGP';
  senderName: string = 'Jonathon Smith';
  senderAccount: string = '123456789';
  recipientName: string = 'Asmaa Dosuky';
  recipientAccount: string = '123456789456';
  fees: number = 18.97;

  showFavoriteList: boolean = false;
  favoriteList = [
    { name: 'Asmaa Dosuky', account: '123456789456' },
    { name: 'Asmaa Dosuky', account: '123456789456' },
  ];

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.updateHeader(this.currentStep);
  }

  setStep(step: number) {
    this.currentStep = step;
    this.updateHeader(step);
  }

  updateHeader(step: number) {
    if (step === 1) {
      this.headerService.updateTitle('Transfer Money');
      this.headerService.updateBreadcrumb(['Home', 'About Us', 'Amount']);
    } else if (step === 2) {
      this.headerService.updateTitle('Transfer Money');
      this.headerService.updateBreadcrumb(['Home', 'About Us', 'Confirmation']);
    } else if (step === 3) {
      this.headerService.updateTitle('Transfer Money');
      this.headerService.updateBreadcrumb(['Home', 'About Us', 'Payment']);
    }
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  toggleFavoriteList() {
    this.showFavoriteList = !this.showFavoriteList;
  }

  confirmTransfer() {
    // Implement logic to confirm the transfer
    console.log('Transfer confirmed');
    this.setStep(3);
  }

  navigateToHome() {
    // Logic to navigate back to home
  }

  addToFavourite() {
    // Logic to add to favorite list
  }
}
