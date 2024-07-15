import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobApplicationFormResponse} from "../models/JobApplicationFormResponse";

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'http://localhost:8089/api/v1/jobApplication/apply'; // Update the URL as needed

  constructor(private http: HttpClient) { }

  submitJobApplication(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'text/plain' // Adjust to accept plain text
      }),
      responseType: 'text' as 'json' // Explicitly set the response type to text
    });
  }

}
