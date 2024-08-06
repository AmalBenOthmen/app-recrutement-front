import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserProfile} from "../models/UserProfile";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8089/api/v1/users';

  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http.get<UserProfile>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user information:', error);
        return throwError(error);
      })
    );
  }

  updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const url = `${this.apiUrl}/admin/editProfile`;
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.put<UserProfile>(url, userProfile, { headers }).pipe(
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

  modifyUserPhoto(file: File): Observable<any> {
    const url = `${this.apiUrl}/ModifierPhoto`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(url, formData, { headers }).pipe(
      map((response: any) => {
        return response; // Return the entire response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error modifying user photo:', error);
        return throwError(error);
      })
    );
  }

  getUserPhoto(filename: string): Observable<Blob> {
    // Construct the URL using the filename
    const url = `${this.apiUrl}/photo/${filename}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching photo:', error);
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

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.delete(`http://localhost:8089/api/v1/auth/logout?token=${token}`).subscribe(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Logout failed', error);
        }
      );
    }
  }
}
