import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserProfile} from "../models/UserProfile";




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8089/api/v1/users';

  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserProfile(): Observable<UserProfile> {
    const url = `${this.apiUrl}/admin/profile`;
    const headers = this.getAuthHeaders();
    return this.http.get<UserProfile>(url, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user information:', error);
        return throwError(error);
      })
    );
  }

  updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const url = `${this.apiUrl}/admin/editProfile`;
    const headers = this.getAuthHeaders();
    return this.http.put<UserProfile>(url, userProfile, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Forbidden: You do not have permission to access this resource.');
        } else {
          console.error('Error updating user profile:', error);
        }
        return throwError(error);
      })
    );

  }

  uploadPhoto(email: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/admin/updatePhoto/${email}`;
    const headers = this.getAuthHeaders();
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.put<any>(url, formData, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Forbidden: You do not have permission to access this resource.');
        } else {
          console.error('Error updating user profile:', error);
        }
        return throwError(error);
      })
    );
  }
  getUserCount(): Observable<number> {
    const url = `${this.apiUrl}/admin/user-count`;
    const headers = this.getAuthHeaders();
    return this.http.get<number>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user count:', error);
        return throwError(error);
      })
    );
  }
}
