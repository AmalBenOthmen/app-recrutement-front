import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {JobPostResponse} from "../../../services/models/job-post-response";
import {JobPostService} from "../../../services/services/job-post.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-browse-job',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './browse-job.component.html',
  styleUrls: ['./browse-job.component.scss']
})
export class BrowseJobComponent implements OnInit {
  jobPosts: JobPostResponse[] = [];

  searchKeyword: string = '';

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
  searchJobs() {
    this.jobPostService.getJobPostsByTitle(this.searchKeyword).subscribe(
      (data) => {
        this.jobPosts = data;
      },
      (error) => {
        console.error('Error fetching job posts', error);
      }
    );
  }
}

