import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationService } from '../../../services/services/JobApplicationService';
import { JobApplicationFormResponse } from '../../../services/models/JobApplicationFormResponse';
import { JobPostService } from "../../../services/services/job-post.service";
import { TokenService } from "../../../services/token/token.service";
import {NgForOf, NgIf} from "@angular/common"; // Adjust path as per your project structure

@Component({
  selector: 'app-get-all-job-application-by-jobpost-id',
  templateUrl: './get-all-job-application-by-jobpost-id.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./get-all-job-application-by-jobpost-id.component.scss']
})
export class GetAllJobApplicationByJobpostIdComponent implements OnInit {
  jobPostId!: number;
  jobApplications: JobApplicationFormResponse[] = [];
  isAdmin: boolean = false; // Track admin status

  constructor(
    private route: ActivatedRoute,
    private jobPostService: JobPostService,
    private tokenService: TokenService // Inject TokenService for role checking
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobPostId = +params.get('id')!; // Ensure correct parameter name from route
      this.checkAdminStatus(); // Check if user is admin
    });
  }

  checkAdminStatus(): void {
    this.isAdmin = this.tokenService.userRoles.includes('ROLE_ADMIN'); // Check if user has admin role

    if (this.isAdmin) {
      this.loadJobApplications();
    } else {
      console.log('Unauthorized access: Only admins can view job applications.');
      // Handle unauthorized access (e.g., redirect or show message)
    }
  }

  loadJobApplications(): void {
    this.jobPostService.getJobApplicationsForJobPost(this.jobPostId).subscribe(
      (applications: JobApplicationFormResponse[]) => {
        console.log('Job Applications:', applications);
        this.jobApplications = applications;
      },
      error => {
        console.error('Error fetching job applications:', error);
        if (error.status === 403) {
          console.error('You do not have permission to access this resource.');
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }

}

