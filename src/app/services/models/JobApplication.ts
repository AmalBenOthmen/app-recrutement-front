// src/app/models/job-application.model.ts
export interface JobApplication {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  address: string;
  phoneNumber: string;
  email: string;
  educationLevel: string;
  speciality: string;
  linkedinLink?: string;
  cv: File;
  additionalDocuments?: File;
  coverLetter: string;
  jobPostId: number;
}
