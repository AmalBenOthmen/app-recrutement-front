import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { JobPostRequest, JobPostResponse } from '../models';
import {JobApplicationFormResponse} from "../models/JobApplicationFormResponse";

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private apiUrl = 'http://localhost:8089/api/v1/job-posts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getJobPosts(): Observable<JobPostResponse[]> {
    return this.http.get<JobPostResponse[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  saveJobPost(jobPost: JobPostRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, jobPost, { headers: this.getAuthHeaders() });
  }
  findJobPostById(id: number): Observable<JobPostResponse> {
    return this.http.get<JobPostResponse>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  getJobApplicationsForJobPost(jobPostId: number): Observable<any> {
    const url = `${this.apiUrl}/${jobPostId}/applications`;
    const headers = this.getAuthHeaders(); // Get authorization headers

    return this.http.get(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Forbidden: You do not have permission to access this resource.');
        }
        return throwError(error);
      })
    );
  }
  downloadCV(fileName: string): Observable<Blob> {
    const url = `${this.apiUrl}/cv/${fileName}`;
    return this.http.get(url, { headers: this.getAuthHeaders(), responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error downloading CV:', error);
        return throwError(error);
      })
    );
  }

  downloadAdditionalDocuments(fileName: string): Observable<Blob> {
    const url = `${this.apiUrl}/additionalDocuments/${fileName}`;
    return this.http.get(url, { headers: this.getAuthHeaders(), responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error downloading additional documents:', error);
        return throwError(error);
      })
    );
  }
  getJobPostsCountByTitle(): Observable<any> {
    const url = `${this.apiUrl}/count-by-title`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching job posts count by title:', error);
        return throwError(error);
      })
    );
  }
  getJobPostsByTitle(title: string): Observable<JobPostResponse[]> {
    return this.http.get<JobPostResponse[]>(`${this.apiUrl}/jobPost/${title}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching job posts by title:', error);
        return throwError(error);
      })
    );
  }
  deleteJobPost(jobPostId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${jobPostId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting job post:', error);
        return throwError(error);
      })
    );
  }
  updateJobPost(jobPostId: number, jobPost: JobPostRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${jobPostId}`, jobPost, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating job post:', error);
        return throwError(error);
      })
    );
  }

}
