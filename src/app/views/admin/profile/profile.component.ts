import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../../../services/models/UserProfile";
import {ProfileService} from "../../../services/services/profile.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

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
  userProfile: UserProfile = new UserProfile('', '', '', '');
  isEditing: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.profileService.getUserProfile().subscribe(
      (data: UserProfile) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  toggleEditMode(): void {
    if (this.isEditing) {
      this.updateUserProfile();
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
        console.error('Error updating user profile', error);
      }
    );
  }


}
