import { Component, OnInit } from '@angular/core';
import { JobPostsService } from "../../../services/services/job-posts.service";
import { JobPost } from "../../../services/models/job-post";
import {CommonModule, DatePipe} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-get-all-job-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './get-all-job-posts.component.html',
  styleUrls: ['./get-all-job-posts.component.scss']
})
export class GetAllJobPostsComponent implements OnInit {
  jobPosts: JobPost[] = [];
  constructor(
    private jobPostsService: JobPostsService,
  ) { }

  ngOnInit(): void {
    this.getAllJobPosts();
  }

  private getAllJobPosts() {
    this.jobPostsService.getAllJobPosts()
      .subscribe({
        next: (jobPosts) => {
          this.jobPosts = jobPosts;
        },
        error: (err) => {
          console.error('Failed to fetch job posts', err);
        }
      });
  }
}
