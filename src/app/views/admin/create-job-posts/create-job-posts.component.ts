import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobPostService } from '../../../services/services/job-post.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-posts.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./create-job-posts.component.scss']
})
export class CreateJobPostsComponent implements OnInit {
  jobPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobPostService: JobPostService,
    private router: Router
  ) {
    this.jobPostForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      responsibilities: ['', Validators.required],
      requirementsANDskills: ['', Validators.required],
      dateLine: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.jobPostForm.valid) {
      this.jobPostService.saveJobPost(this.jobPostForm.value).subscribe({
        next: (jobPostId: number) => {
          alert('Job post saved successfully!');
          this.router.navigate(['/job-details', jobPostId]);
        },
        error: (err) => {
          console.error('Error creating job post', err);
        }
      });
    }
  }

  goToJobPosts(): void {
    this.router.navigate(['/job-details/:id']);
  }
}
