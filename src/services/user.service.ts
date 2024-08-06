// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://speedo-transfer-437e318f5416.herokuapp.com/api/user/details';

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    // Replace 'your-auth-token' with the actual token
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b3Vzc2VmLnNhbWlyQGV4YW1wbGUuY29tIiwianRpIjoiMSIsImlhdCI6MTcyMjkyOTc2MiwiZXhwIjoxNzIyOTMxNTYyfQ.BbAhLC1TL0iILbG5de2WKvxOBFJUKQHOuEXg3zju6dQ');
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
