import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://speedo-transfer-437e318f5416.herokuapp.com/api/user/details';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserDetails(): Observable<any> {
    // Retrieve the token using AuthService
    const token = this.authService.getToken();
    console.log(this.authService.getToken());
    if (!token) {
      console.error('No authentication token found.');
      return throwError(() => new Error('No authentication token found.'));
    }

    // Set up headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get<any>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Unauthorized: Invalid credentials or token.';
      } else if (error.status === 400) {
        errorMessage = 'Bad request. Please check your input.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
