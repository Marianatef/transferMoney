import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    console.log('Retrieved token:', token); // Log token retrieval
    return token;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      console.log('Setting token:', token); // Log token setting
      localStorage.setItem('authToken', token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      console.log('Clearing token'); // Log token clearing
      localStorage.removeItem('authToken');
    }
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token); // Store the token after login
        } else {
          console.error('Login response does not contain a token');
        }
      })
    );
  }

  getUserDetails(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found, cannot fetch user details');
      return new Observable(); // Return an empty observable if no token
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user/details`, { headers });
  }
}
