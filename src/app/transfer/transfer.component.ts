import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { Location } from '@angular/common';
import { TransferService } from '../../services/transfer.service'; // Adjust the import path if needed
import { HttpErrorResponse } from '@angular/common/http';

export interface TransferData {
  accountNumber: string;
  amount: number;
  sendCurrency: string;
  receiveCurrency: string;
}
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  currentStep: number = 1;
  amount: number = 1000;
  recipientAmount: number = 0;
  selectedSendCurrency: string = 'USD';
  selectedReceiveCurrency: string = 'EGY';
  senderName: string = 'Jonathon Smith';
  senderAccount: string = '123456789';
  recipientName: string = 'Asmaa Dosuky';
  recipientAccount: string = '123456789456';
  fees: number = 18.97;
  exchangeRate: number = 0;

  showFavoriteList: boolean = false;
  favoriteList: any[] = [];

  constructor(
    private headerService: HeaderService,
    private location: Location,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    this.updateHeader(this.currentStep);
    this.fetchExchangeRate();
    this.getFavoriteList(); // Load favorite list on initialization
  }

  fetchExchangeRate() {
    this.transferService
      .getExchangeRate(this.selectedSendCurrency, this.selectedReceiveCurrency)
      .subscribe({
        next: (response: { exchangeRate: number }) => {
          if (response && response.exchangeRate) {
            this.exchangeRate = response.exchangeRate;
            this.updateRecipientAmount(); // Update recipient amount after fetching the rate
          } else {
            console.error('Invalid response structure:', response);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to fetch exchange rate', error.message);
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

    this.headerService.updateTitle('Transfer Money');
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

  closeFavoriteList(): void {
    this.showFavoriteList = false;
  }

  confirmTransfer() {
    const transferData: TransferData = {
      accountNumber: this.recipientAccount,
      amount: this.recipientAmount,
      sendCurrency: this.selectedSendCurrency,
      receiveCurrency: this.selectedReceiveCurrency,
    };

    this.transferService.transferMoney(transferData).subscribe({
      next: (response: any) => {
        console.log('Transfer successful', response);
        this.setStep(3); // Move to payment step or show success message
      },
      error: (error: HttpErrorResponse) => {
        console.error('Transfer failed', error.message);
        this.setStep(3);
        // Optionally, show an error message to the user
      },
    });
  }

  navigateToHome() {
    this.location.back(); // Navigate back to the previous page or home
  }

  addToFavourite() {
    const favoriteData = {
      fullName: this.recipientName,
      accountNumber: this.recipientAccount,
    };

    this.transferService.addFavorite(favoriteData).subscribe({
      next: (response: any) => {
        console.log('Added to favorites', response);
        // Optionally, update the favorite list UI
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to add to favorites', error.message);
      },
    });
  }

  getFavoriteList() {
    this.transferService.getFavorites().subscribe({
      next: (favorites: any[]) => {
        this.favoriteList = favorites;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching favorites', error.message);
      },
    });
  }

  onSendCurrencyChange(newCurrency: string) {
    this.selectedSendCurrency = newCurrency;
    this.fetchExchangeRate(); // Fetch new exchange rate and update amounts
  }

  onReceiveCurrencyChange(newCurrency: string) {
    this.selectedReceiveCurrency = newCurrency;
    this.fetchExchangeRate(); // Fetch new exchange rate and update amounts
  }
}
