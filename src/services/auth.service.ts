import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) {}

  // Get user details
  getUser(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/user/details`)
      .pipe(catchError(this.handleError));
  }

  // Get user balance
  getBalance(): Observable<string> {
    return this.http
      .get(`${this.apiUrl}/api/account/balance`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Update user details
  updateUser(updatedFields: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/user/update`, updatedFields)
      .pipe(catchError(this.handleError));
  }

  // Update user password
  // updatePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/password`, passwordData).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Get user transaction history
  getHistory(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/transaction`)
      .pipe(catchError(this.handleError));
  }

  // Register a new user
  register(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/auth/register`, user)
      .pipe(catchError(this.handleError));
  }

  // Log in a user
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload = JSON.stringify({ email, password });
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/api/auth/login`, payload, {
        headers,
      })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token); // Save the token to localStorage
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            console.error('Unauthorized: Invalid credentials');
          } else {
            console.error('An unexpected error occurred:', error);
          }
          return throwError(error);
        })
      );
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Log out the user
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken'); // Clear the token from localStorage
    }
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized: Invalid credentials or token.';
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
