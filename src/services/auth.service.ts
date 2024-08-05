import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>('/api/auth/register', user);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const loginData = { email, password };
    return this.http.post<{ token: string }>('/api/auth/login', loginData);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}
