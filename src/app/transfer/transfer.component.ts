import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent {
  currentStep: number = 1;
  amount: number = 1000; // Amount being sent
  recipientAmount: number = 48422.0; // Amount recipient receives
  selectedSendCurrency: string = 'USD'; // Currency being sent
  selectedReceiveCurrency: string = 'EGP'; // Currency being received
  senderName: string = 'Jonathon Smith'; // Sender's name
  recipientName: string = 'Asmaa Dosuky'; // Recipient's name
  recipientAccount: string = '123456789456'; // Recipient's account
  fees: number = 18.97;

  showFavoriteList: boolean = false;
  favoriteList = [
    { name: 'Asmaa Dosuky', account: '123456789456' },
    { name: 'Asmaa Dosuky', account: '123456789456' },
  ];

  setStep(step: number) {
    this.currentStep = step;
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
    this.setStep(3); // Proceed to the payment step
  }
  navigateToHome() {
    // Logic to navigate back to home
  }

  addToFavourite() {
    // Logic to add to favorite list
  }
}
