import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Message } from '../models/message'; // Adjust path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8089/api/v1'; // Replace with your backend base URL

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  saveMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.post<Message>(`${this.apiUrl}/messages/send`, message, { headers });
  }

  getUnreadMessages(): Observable<Message[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.get<Message[]>(`${this.apiUrl}/messages/unread`, { headers });
  }

  markAsRead(id: number): Observable<Message> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.put<Message>(`${this.apiUrl}/messages/read/${id}`, {}, { headers });
  }

  getAllMessages(): Observable<Message[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.get<Message[]>(`${this.apiUrl}/messages/all`, { headers });
  }
}
