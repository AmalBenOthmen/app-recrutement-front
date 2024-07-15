import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import { JobApplication } from '../../../services/models/JobApplication';
import { JobApplicationService } from '../../../services/services/JobApplicationService';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {
  @Input({transform: numberAttribute}) jobPostId!: number;
  @Output() formSubmitted = new EventEmitter<boolean>();

  application: JobApplication = {} as JobApplication;

  constructor(private jobApplicationService: JobApplicationService) {}

  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (field === 'cv') {
      this.application.cv = file;
    } else if (field === 'additionalDocuments') {
      this.application.additionalDocuments = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('jobPostId', this.jobPostId.toString()); // Include jobPostId in the form data
    for (const key in this.application) {
      if (this.application.hasOwnProperty(key)) {
        formData.append(key, (this.application as any)[key]);
      }
    }

    this.jobApplicationService.submitJobApplication(formData).subscribe(response => {
      console.log('Form submitted successfully', response);
      this.formSubmitted.emit(true);
    }, error => {
      console.error('Form submission failed', error);
      this.formSubmitted.emit(false);
    });
  }
}
