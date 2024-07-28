import { Component, OnInit } from '@angular/core';
import { FavoriteJobPostService } from '../../../services/services/FavoriteJobPostList';
import { FavoriteJobPostListDTO } from "../../../services/models/FavoriteJobPostListDTO";
import { TokenService } from '../../../services/token/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorite-job-post-list',
  templateUrl: './favorite-job-post-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatProgressSpinner,
    NgClass,
    RouterLink
  ],
  styleUrls: ['./favorite-job-post-list.component.scss']
})
export class FavoriteJobPostListComponent implements OnInit {
  favoriteJobPosts: FavoriteJobPostListDTO[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private favoriteJobPostService: FavoriteJobPostService,
    private authService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFavoriteJobPosts();
  }

  loadFavoriteJobPosts(): void {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.loading = true;
      this.favoriteJobPostService.getFavoriteJobPosts(userEmail).subscribe({
        next: (data: FavoriteJobPostListDTO[]) => {
          this.favoriteJobPosts = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching favorite job posts';
          console.error('Error fetching favorite job posts', err);
          this.loading = false;
        }
      });
    }
  }

  viewJobDetails(id?: number): void {
    if (id !== undefined) {
      // Implement the logic to view job details
      console.log(`Viewing details for job post with ID: ${id}`);
    } else {
      console.error('Job post ID is undefined');
    }
  }
}
