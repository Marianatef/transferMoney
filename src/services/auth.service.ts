import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  email: string;
  tokenType: string;
  message: string;
  status: {
    error: boolean;
    is4xxClientError: boolean;
    is5xxServerError: boolean;
    is1xxInformational: boolean;
    is2xxSuccessful: boolean;
    is3xxRedirection: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  register(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/register`, user)
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token); // Store the token
          } else {
            console.error('Login response does not contain a token');
            // Optionally, throw an error or handle it appropriately
          }
        }),
        catchError(this.handleError)
      );
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.apiUrl}/auth/refresh-token`, {}, { headers })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token); // Store the new token
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
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

  logout(): void {
    localStorage.removeItem('authToken'); // Clear the token from storage
  }
}
