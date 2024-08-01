import { Component, OnInit } from '@angular/core';
import { JobPostResponse } from "../../../services/models/job-post-response";
import { JobPostService } from "../../../services/services/job-post.service";
import {Router, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-get-all-job-posts',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './get-all-job-posts.component.html',
  styleUrls: ['./get-all-job-posts.component.scss']
})
export class GetAllJobPostsComponent implements OnInit {
  jobPosts: JobPostResponse[] = [];

  constructor(private jobPostService: JobPostService, private router: Router) {}

  ngOnInit(): void {
    this.jobPostService.getJobPosts().subscribe({
      next: (data) => {
        this.jobPosts = data;
      },
      error: (err) => {
        console.error('Error fetching job posts', err);
      }
    });
  }

  onUpdate(jobPostId: number | undefined): void {
    if (jobPostId !== undefined) {
      this.router.navigate(['/admin/update-job-post', jobPostId]);
    }
  }

  onDelete(jobPostId: number | undefined): void {
    if (jobPostId !== undefined && confirm('Are you sure you want to delete this job post?')) {
      this.jobPostService.deleteJobPost(jobPostId).subscribe({
        next: () => {
          this.jobPosts = this.jobPosts.filter(jobPost => jobPost.id !== jobPostId);
        },
        error: (err) => {
          console.error('Error deleting job post', err);
        }
      });
    }
  }
}
