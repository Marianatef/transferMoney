import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { Location } from '@angular/common';
import { TransferService } from '../../services/transfer.service'; // Import the TransferService
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  currentStep: number = 1;
  amount: number = 1000;
  recipientAmount: number = 0; // Default to 0 until fetched
  selectedSendCurrency: string = 'USD';
  selectedReceiveCurrency: string = 'EGP';
  senderName: string = 'Jonathon Smith';
  senderAccount: string = '123456789';
  recipientName: string = 'Asmaa Dosuky';
  recipientAccount: string = '123456789456';
  fees: number = 18.97;
  exchangeRate: number = 0; // Exchange rate from API

  showFavoriteList: boolean = false;
  favoriteList = [
    { name: 'Asmaa Dosuky', account: '123456789456' },
    { name: 'Asmaa Dosuky', account: '123456789456' },
  ];

  constructor(
    private headerService: HeaderService,
    private location: Location,
    private transferService: TransferService // Inject TransferService
  ) {}

  ngOnInit() {
    this.updateHeader(this.currentStep);
    this.fetchExchangeRate(); // Ensure exchange rate is fetched on component init
  }

  fetchExchangeRate() {
    this.transferService
      .getExchangeRate(this.selectedSendCurrency, this.selectedReceiveCurrency)
      .subscribe({
        next: (response: any) => {
          this.exchangeRate = response.exchangeRate; // Adjust this if your API returns a different structure
          this.updateRecipientAmount();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to fetch exchange rate', error.message);
          // Optionally, show an error message to the user
        },
      });
  }

  updateRecipientAmount() {
    this.recipientAmount = this.amount * this.exchangeRate;
  }

  setStep(step: number) {
    this.currentStep = step;
    this.updateHeader(step);
  }

  updateHeader(step: number) {
    const titles = ['Amount', 'Confirmation', 'Payment'];
    const breadcrumbs = ['Home', 'About Us'];

    this.headerService.updateTitle(`Transfer Money`);
    this.headerService.updateBreadcrumb([...breadcrumbs, titles[step - 1]]);
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
    const transferData = {
      amount: this.amount,
      recipientAccount: this.recipientAccount,
      currency: this.selectedSendCurrency,
    };
    this.transferService.transferMoney(transferData).subscribe({
      next: (response: any) => {
        console.log('Transfer successful', response);
        this.setStep(3);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Transfer failed', error.message);
        // Optionally, show an error message to the user
      },
    });
  }

  navigateToHome() {
    // Logic to navigate back to home
  }

  addToFavourite() {
    // Logic to add to favorite list
  }

  closeFavoriteList(): void {
    this.showFavoriteList = false;
  }

  onSendCurrencyChange(newCurrency: string) {
    this.selectedSendCurrency = newCurrency;
    this.fetchExchangeRate(); // Fetch exchange rate whenever the send currency changes
  }

  onReceiveCurrencyChange(newCurrency: string) {
    this.selectedReceiveCurrency = newCurrency;
    this.fetchExchangeRate(); // Fetch exchange rate whenever the receive currency changes
  }
}
