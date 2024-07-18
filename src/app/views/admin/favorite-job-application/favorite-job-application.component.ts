import { Component, OnInit, Input } from '@angular/core';
import { FavoriteJobApplicationFormListService } from "../../../services/services/FavoriteJobApplicationFormListService";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-favorite-job-application',
  templateUrl: './favorite-job-application.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrls: ['./favorite-job-application.component.scss']
})
export class FavoriteJobApplicationComponent implements OnInit {

  @Input() userEmail!: string;
  @Input() jobApplicationFormId!: number;
  isFavorite: boolean = false;

  constructor(private favoriteJobApplicationFormListService: FavoriteJobApplicationFormListService) {
  }

  ngOnInit(): void {
    // Check if the job application form is in the wishlist on component initialization
    this.checkInitialFavoriteStatus();
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteJobApplicationFormListService.removeFromWishlist(this.jobApplicationFormId, this.userEmail)
        .subscribe(
          () => {
            console.log('Removed from wishlist');
            this.isFavorite = false; // Update the local state after successful removal
            this.updateLocalStorage(); // Update localStorage
          },
          error => {
            console.error('Error removing from wishlist:', error);
          }
        );
    } else {
      this.favoriteJobApplicationFormListService.addToWishlist(this.jobApplicationFormId, this.userEmail)
        .subscribe(
          () => {
            console.log('Added to wishlist');
            this.isFavorite = true; // Update the local state after successful addition
            this.updateLocalStorage(); // Update localStorage
          },
          error => {
            console.error('Error adding to wishlist:', error);
          }
        );
    }
  }

  checkInitialFavoriteStatus() {
    // Check localStorage for favorite status on component initialization
    const favoriteStatus = localStorage.getItem(`favorite_${this.jobApplicationFormId}`);
    if (favoriteStatus === 'true') {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }

  updateLocalStorage() {
    // Update localStorage with current favorite status
    localStorage.setItem(`favorite_${this.jobApplicationFormId}`, this.isFavorite.toString());
  }
}
