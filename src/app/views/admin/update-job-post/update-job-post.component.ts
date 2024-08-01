import {Component, OnInit} from '@angular/core';
import {JobPostResponse} from "../../../services/models/job-post-response";
import {ActivatedRoute, Router} from "@angular/router";
import {JobPostService} from "../../../services/services/job-post.service";
import {JobPostRequest} from "../../../services/models/job-post-request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-job-post',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './update-job-post.component.html',
  styleUrl: './update-job-post.component.scss'
})
export class UpdateJobPostComponent  implements OnInit {
  jobPost: JobPostResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobPostService: JobPostService
  ) {
  }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobPostService.findJobPostById(+jobId).subscribe({
        next: (data) => {
          this.jobPost = data;
        },
        error: (err) => {
          console.error('Error fetching job post', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.jobPost) {
      const jobPostRequest: JobPostRequest = {
        title: this.jobPost.title || '',
        description: this.jobPost.description || '',
        responsibilities: this.jobPost.responsibilities || '',
        requirementsANDskills: this.jobPost.requirementsANDskills || '',
        dateLine: this.jobPost.dateLine || ''
      };

      if (this.jobPost.id !== undefined) {
        this.jobPostService.updateJobPost(this.jobPost.id, jobPostRequest).subscribe({
          next: () => {
            this.router.navigate(['admin/get-all-jobPosts']);
          },
          error: (err) => {
            console.error('Error updating job post', err);
          }
        });
      }
    }
  }
}
