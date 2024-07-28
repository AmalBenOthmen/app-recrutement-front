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
export class ProfileComponent {
  email: string = '';
file: File | null = null;

constructor(private uploadPhotoService: ProfileService) {}

onFileSelected(event: any) {
  this.file = event.target.files[0];
}

onUpload() {
  if (this.email && this.file) {
    this.uploadPhotoService.uploadPhoto(this.email, this.file).subscribe(
      (response) => {
        alert(response.message);
      },
      (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
      }
    );
  } else {
    alert('Please provide an email and select a file.');
  }
}
}
