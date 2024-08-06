// transfer.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface TransferData {
  accountNumber: string;
  amount: number;
  sendCurrency: string;
  receiveCurrency: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  getExchangeRate(fromCurrency: string, toCurrency: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/currencyExchange/${fromCurrency}/${toCurrency}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  transferMoney(transferData: TransferData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/transfer`, transferData, {
      headers: this.getAuthHeaders(),
    });
  }
}
