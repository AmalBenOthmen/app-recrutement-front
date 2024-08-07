import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import { Message } from '../models/message'; // Adjust path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8089/api/v1'; // Replace with your backend base URL
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private ws!: WebSocket;

  constructor(private http: HttpClient, private tokenService: TokenService) {

  }

  saveMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.post<Message>(`${this.apiUrl}/messages/send`, message, { headers }).pipe(
      tap(() => this.loadMessages()) // Reload messages after saving a new one
    );
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
    return this.http.put<Message>(`${this.apiUrl}/messages/read/${id}`, {}, { headers }).pipe(
      tap(() => {
        const messages = this.messagesSubject.getValue();
        const messageIndex = messages.findIndex(m => m.id === id);
        if (messageIndex !== -1) {
          messages[messageIndex].read = true;
          this.messagesSubject.next([...messages]);
        }
      })
    );
  }

  getAllMessages(): Observable<Message[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.get<Message[]>(`${this.apiUrl}/messages/all`, { headers }).pipe(
      tap(messages => this.messagesSubject.next(messages))
    );
  }

  loadMessages() {
    this.getAllMessages().subscribe();
  }
  deleteMessage(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.delete<void>(`${this.apiUrl}/messages/delete/${id}`, { headers }).pipe(
      tap(() => {
        const messages = this.messagesSubject.getValue();
        const updatedMessages = messages.filter(m => m.id !== id);
        this.messagesSubject.next(updatedMessages);
      })
    );
  }

}
