import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define Note model
export interface Note {
  id: number;
  content: string;
}
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8089/api/v1/admin/notes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getNotes(): Observable<Note[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Note[]>(`${this.apiUrl}/get-note`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching notes:', error.message);
        return throwError('Error fetching notes. Please try again later.');
      })
    );
  }

  addNote(note: Note): Observable<Note> {
    const headers = this.getAuthHeaders();
    return this.http.post<Note>(`${this.apiUrl}/add-note`, note, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding note:', error.message);
        return throwError('Error adding note. Please try again later.');
      })
    );
  }

  updateNote(note: Note): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/update-note/${note.id}`, note.content, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating note:', error.message);
        return throwError('Error updating note. Please try again later.');
      })
    );
  }

  deleteNote(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/delete-note/${id}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting note:', error.message);
        return throwError('Error deleting note. Please try again later.');
      })
    );
  }
}
