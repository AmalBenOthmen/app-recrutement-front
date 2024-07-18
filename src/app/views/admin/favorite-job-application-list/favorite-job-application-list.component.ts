import { Component, OnInit } from '@angular/core';
import { FavoriteJobApplicationFormListDTO } from "../../../services/models/favorite-job-application-form-list-dto";
import { FavoriteJobApplicationFormListService } from "../../../services/services/FavoriteJobApplicationFormListService";
import { TokenService } from "../../../services/token/token.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-favorite-job-application-list',
  templateUrl: './favorite-job-application-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./favorite-job-application-list.component.scss']
})
export class FavoriteJobApplicationListComponent implements OnInit {

  wishlistEntries: FavoriteJobApplicationFormListDTO[] = [];
  userEmail: string | null = null;

  constructor(
    private favoriteJobApplicationFormListService: FavoriteJobApplicationFormListService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.tokenService.getUserEmail();
    if (this.userEmail) {
      this.loadWishlistEntries();
    } else {
      console.error('User email not found.');
    }
  }

  loadWishlistEntries() {
    if (this.userEmail) {
      this.favoriteJobApplicationFormListService.getWishlistEntries(this.userEmail)
        .subscribe(
          data => {
            this.wishlistEntries = data;
          },
          error => {
            console.error('Error fetching wishlist entries:', error);
          }
        );
    } else {
      console.error('User email is null.');
    }
  }

  downloadCV(cvPath: string) {
    // Implement download logic here
  }

  downloadAdditionalDocuments(additionalDocumentsPath: string) {
    // Implement download logic here
  }
}
