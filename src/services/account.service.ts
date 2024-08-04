import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com/';

  constructor() { }
}
