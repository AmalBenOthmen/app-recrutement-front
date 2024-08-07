import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Message } from '../../../services/models/message';
import { MessageService } from '../../../services/services/messageService';
import { AdminContainerComponent } from '../admin-container/admin-container.component';
import { ProfileService } from '../../../services/services/profile.service';
import { UserProfile } from '../../../services/models/UserProfile';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminContainerComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  messages: Message[] = [];
  unreadCount: number = 0;
  showAdminContainer: boolean = true;
  profile: UserProfile | undefined;
  photoUrl: string | undefined;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAdminContainer = event.urlAfterRedirects === '/admin';
      }
    });
  }

  ngOnInit(): void {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages.reverse();
      this.unreadCount = this.messages.filter(message => !message.read).length;
    });

    // Fetch user profile
    this.profileService.getUserProfile().subscribe(profile => {
      this.profile = profile;
      if (profile.photo) {
        this.photoUrl = `http://localhost:8089/api/v1/users/photo/${profile.photo}`;
        console.log('Photo URL:', this.photoUrl);
      }
    });

    // Load messages
    this.messageService.loadMessages();

    // Hide AdminContainerComponent after the first visit
    setTimeout(() => {
      this.showAdminContainer = false;
    }, 0);
  }

  markAllAsRead() {
    this.messages.forEach(message => {
      if (!message.read) {
        this.messageService.markAsRead(message.id!).subscribe();
      }
    });
  }

  logout(): void {
    this.profileService.logout();
  }
}
