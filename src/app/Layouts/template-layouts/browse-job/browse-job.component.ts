import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobPostResponse } from '../../../services/models/job-post-response';
import { JobPostService } from '../../../services/services/job-post.service';
import { TokenService } from '../../../services/token/token.service';
import { FavoriteJobPostService } from '../../../services/services/FavoriteJobPostList';
import { FavoriteJobPostListDTO, FavoriteStatus } from '../../../services/models/FavoriteJobPostListDTO';

@Component({
  selector: 'app-browse-job',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './browse-job.component.html',
  styleUrls: ['./browse-job.component.scss']
})
export class BrowseJobComponent implements OnInit {
  jobPosts: JobPostResponse[] = [];
  favoriteJobPosts: Set<number> = new Set(); // Store IDs of favorited job posts
  searchKeyword: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private jobPostService: JobPostService,
    private favoriteJobPostService: FavoriteJobPostService,
    private authService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadJobPosts();
    this.loadFavoriteJobPosts();
  }

  loadJobPosts(): void {
    this.loading = true;
    this.jobPostService.getJobPosts().subscribe({
      next: (data) => {
        this.jobPosts = data;
        this.updateJobPostsFavoriteStatus();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching job posts';
        console.error('Error fetching job posts', err);
        this.loading = false;
      }
    });
  }

  loadFavoriteJobPosts(): void {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.favoriteJobPostService.getFavoriteJobPosts(userEmail).subscribe({
        next: (data: FavoriteJobPostListDTO[]) => {
          this.favoriteJobPosts = new Set(data.filter(dto => dto.status === FavoriteStatus.FAVORITED).map(dto => dto.jobPost.id!));
        },
        error: (err) => {
          console.error('Error fetching favorite job posts', err);
        }
      });
    }
  }

  isFavorite(jobPostId: number | undefined): boolean {
    return this.favoriteJobPosts.has(<number>jobPostId);
  }

  toggleFavorite(jobPostId: number | undefined): void {
    if (jobPostId === undefined) {
      console.error('Invalid job post ID');
      return;
    }

    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      if (this.isFavorite(jobPostId)) {
        this.favoriteJobPostService.removeFromFavorite(jobPostId, userEmail).subscribe({
          next: () => {
            this.favoriteJobPosts.delete(jobPostId);
            this.snackBar.open('Removed from favorites', 'Close', { duration: 2000 });
            this.updateJobPostsFavoriteStatus();
            console.log('Removed from favorites:', jobPostId);
          },
          error: (err) => {
            console.error('Error removing from favorites', err);
          }
        });
      } else {
        this.favoriteJobPostService.addToFavorite(jobPostId, userEmail).subscribe({
          next: () => {
            this.favoriteJobPosts.add(jobPostId);
            this.snackBar.open('Added to favorites', 'Close', { duration: 2000 });
            this.updateJobPostsFavoriteStatus();
            console.log('Added to favorites:', jobPostId);
          },
          error: (err) => {
            console.error('Error adding to favorites', err);
          }
        });
      }
    }
  }

  updateJobPostsFavoriteStatus(): void {
    this.jobPosts = this.jobPosts.map(jobPost => ({
      ...jobPost,
      isFavorited: this.favoriteJobPosts.has(jobPost.id!)
    }));
  }

  searchJobs(): void {
    this.loading = true;
    this.jobPostService.getJobPostsByTitle(this.searchKeyword).subscribe({
      next: (data) => {
        this.jobPosts = data;
        this.updateJobPostsFavoriteStatus();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching job posts';
        console.error('Error fetching job posts', error);
        this.loading = false;
      }
    });
  }
}
