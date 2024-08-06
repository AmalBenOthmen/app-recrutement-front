import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostResponse } from '../../../../services/models/job-post-response';
import { JobPostService } from '../../../../services/services/job-post.service';
import {JobApplicationComponent} from "../../../../views/user/job-application/job-application.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  standalone: true,
  imports: [
    JobApplicationComponent,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobPost?: JobPostResponse;
  isModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private jobPostService: JobPostService
  ) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobPostService.findJobPostById(Number(jobId)).subscribe((data: JobPostResponse) => {
        this.jobPost = data;
      });
    }
  }
  get responsibilitiesList(): string[] {
    return this.jobPost?.responsibilities?.split('\n') || [];
  }

  get requirementsAndSkillsList(): string[] {
    return this.jobPost?.requirementsANDskills?.split('\n') || [];
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleFormSubmitted(success: boolean) {
    if (success) {
      this.closeModal();
      alert('Application submitted successfully!');
    }
  }
}
