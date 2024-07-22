import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../services/models/UserProfile";
import { ProfileService } from "../../../services/services/profile.service";
import { NgIf } from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isEditMode: boolean = false;

  constructor(private userProfileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(): void {
    if (this.userProfile) {
      this.userProfileService.updateUserProfile(this.userProfile).subscribe(
        (response) => {
          this.isEditMode = false;
          this.loadUserProfile();
        },
        (error) => {
          console.error('Failed to update profile', error);
        }
      );
    }
  }
}
