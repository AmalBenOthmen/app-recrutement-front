import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {FavoriteJobApplicationFormList} from "../models/FavoriteJobApplicationFormList";
import {FavoriteJobApplicationFormListDTO} from "../models/favorite-job-application-form-list-dto";
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobApplicationFormListService {

  private apiUrl = 'http://localhost:8089/api/v1/favorite-application-form-list';

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  addToWishlist(jobApplicationFormId: number, userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, null, { params: { jobApplicationFormId, userEmail }, headers, responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  removeFromWishlist(jobApplicationFormId: number, userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/remove`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(url, { params: { jobApplicationFormId, userEmail }, headers, responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getWishlistEntries(userEmail: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.token}`
    });

    return this.http.get(`${this.apiUrl}/list?userEmail=${userEmail}`, { headers });
  }}
