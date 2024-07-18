import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service'; // Adjust path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8089/api/v1'; // Replace with your backend base URL

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  saveMessage(message: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/messages/send`, message, { headers });
  }

  getUnreadMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });

    return this.http.get(`${this.apiUrl}/messages/unread`, { headers });
  }
}
