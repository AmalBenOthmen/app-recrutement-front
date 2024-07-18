// favorite-job-application-form-list-dto.ts

export interface FavoriteJobApplicationFormListDTO {
  id: number;
  jobApplicationForm: JobApplicationFormDTO;
}

export interface JobApplicationFormDTO {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  address: string;
  email: string;
  phoneNumber: string;
  educationLevel: string;
  speciality: string;
  linkedinLink: string;
  cvPath: string;
  additionalDocumentsPath: string;
  coverLetter: string;
  jobPostId: number;
}
