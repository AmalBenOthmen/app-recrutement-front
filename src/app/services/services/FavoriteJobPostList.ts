import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import {FavoriteJobPostListDTO} from "../models/FavoriteJobPostListDTO";

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobPostService {
  private apiUrl = 'http://localhost:8089/api/v1/favorite-job-post-list/user';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addToFavorite(jobPostId: number, userEmail: string): Observable<any> {
    if (!userEmail) {
      return throwError('User email is required');
    }
    const url = `${this.apiUrl}/add`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.token}`);
    return this.http.post(url, null, { params: { jobPostId: jobPostId.toString(), userEmail }, headers, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  removeFromFavorite(jobPostId: number, userEmail: string): Observable<any> {
    if (!userEmail) {
      return throwError('User email is required');
    }
    const url = `${this.apiUrl}/remove`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.token}`);
    return this.http.delete(url, { params: { jobPostId: jobPostId.toString(), userEmail }, headers, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getFavoriteJobPosts(userEmail: string): Observable<FavoriteJobPostListDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.token}`
    });
    return this.http.get<FavoriteJobPostListDTO[]>(`${this.apiUrl}/list`, { headers, params: { userEmail } })
      .pipe(catchError(this.handleError));
  }


}
