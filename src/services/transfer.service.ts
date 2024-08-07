// transfer.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TransferData {
  accountNumber: string;
  amount: number;
  sendCurrency: string;
  receiveCurrency: string;
}
export interface FavoriteData {
  fullName: string;
  accountNumber: string;
}

export interface TransactionData {
  transactionId: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  status: boolean;
  timestamp: string;
}
@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) {}

  getExchangeRate(from: string, to: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/currencyExchange/${from}/${to}`) // Use template literals for parameter substitution
      .pipe(catchError(this.handleError));
  }

  transferMoney(transferData: TransferData): Observable<any> {
    return this.http
      .post<TransferData>(`${this.apiUrl}/api/transfer`, transferData)
      .pipe(catchError(this.handleError));
  }

  getFavorites(): Observable<FavoriteData[]> {
    return this.http
      .get<FavoriteData[]>(`${this.apiUrl}/api/favorites`)
      .pipe(catchError(this.handleError));
  }

  addFavorite(favoriteData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favorites`, favoriteData);
  }

  // Transaction related methods
  getTransactions(): Observable<TransactionData[]> {
    return this.http
      .get<TransactionData[]>(`${this.apiUrl}/api/transactions`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized: Invalid credentials or token.';
          this.router.navigate(['/login']); // Navigate to login page on 401 error
          break;
        case 403:
          errorMessage =
            'Forbidden: You do not have permission to access this resource.';
          break;
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
