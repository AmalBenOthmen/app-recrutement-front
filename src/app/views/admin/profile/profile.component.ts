import {Component, OnInit} from '@angular/core';
import {UserProfile} from "../../../services/models/UserProfile";
import {ProfileService} from "../../../services/services/profile.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private userProfileService: ProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
