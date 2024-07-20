import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {JobPostService} from "../../../../services/services/job-post.service";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {

  jobPosts: any[] = [];

  constructor(private jobPostService: JobPostService) { }

  ngOnInit(): void {
    this.jobPostService.getJobPostsCountByTitle().subscribe({
      next: (data) => {
        this.jobPosts = data;
      },
      error: (error) => {
        console.error('Error fetching job posts:', error);
      }
    });
  }
}
