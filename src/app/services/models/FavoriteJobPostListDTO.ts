// src/app/services/models/FavoriteJobPostListDTO.ts
import { JobPostDTO } from './JobPostDTO';
import {JobPostResponse} from "./job-post-response";

export interface FavoriteJobPostListDTO {
  id: number;
  jobPost: JobPostResponse;
  status: FavoriteStatus; // Update with new enum
}

export enum FavoriteStatus {
  FAVORITED = 'FAVORITED',
  REMOVED = 'REMOVED'
}
