import {Component, OnInit} from '@angular/core';
import {JobPostResponse} from "../../../services/models/job-post-response";
import {JobPostService} from "../../../services/services/job-post.service";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-get-all-job-posts',
  standalone: true,
  imports: [RouterModule,
  CommonModule],
  templateUrl: './get-all-job-posts.component.html',
  styleUrl: './get-all-job-posts.component.scss'
})
export class GetAllJobPostsComponent implements OnInit{
  jobPosts: JobPostResponse[] = [];

  constructor(private jobPostService: JobPostService) {}

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
}

