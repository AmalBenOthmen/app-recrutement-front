import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../services/models/UserProfile";
import { ProfileService } from "../../../services/services/profile.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = new UserProfile('', '', '', '', '');
  isEditing: boolean = false;
  selectedFile: File | null = null;
  uploadedImageUrl: string | ArrayBuffer | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.profileService.getUserProfile().subscribe(
      (data: UserProfile) => {
        this.userProfile = data;
        if (data.photo) {
          this.loadUserPhoto(data.photo);
        }
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  loadUserPhoto(photoPath: string): void {
    // Remove any leading slash from photoPath
    if (photoPath.startsWith('/')) {
      photoPath = photoPath.substring(1);
    }

    this.profileService.getUserPhoto(photoPath).subscribe(
      (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.uploadedImageUrl = objectURL;
      },
      (error) => {
        console.error('Error loading user photo:', error);
      }
    );
  }



  toggleEditMode(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.uploadPhoto();
      } else {
        this.updateUserProfile();
      }
    } else {
      this.userProfile.password = ''; // Clear the password field when entering edit mode
    }
    this.isEditing = !this.isEditing;
  }

  updateUserProfile(): void {
    this.profileService.updateUserProfile(this.userProfile).subscribe(
      (data: UserProfile) => {
        this.userProfile = data;
        alert('Profile updated successfully');
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadPhoto(): void {
    if (this.selectedFile) {
      this.profileService.modifyUserPhoto(this.selectedFile).subscribe(
        (response: any) => {
          const photoPath = response.message; // Extract the photo path from the response
          if (photoPath) {
            this.loadUserPhoto(photoPath); // Reload the photo after upload
            alert('Photo uploaded successfully');
          } else {
            console.error('Photo path not found in response');
          }
        },
        (error) => {
          console.error('Error uploading photo:', error);
        }
      );
    }
  }
}
