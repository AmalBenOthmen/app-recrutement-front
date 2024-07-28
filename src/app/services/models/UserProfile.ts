export interface UserProfile {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  photo:string;
}
