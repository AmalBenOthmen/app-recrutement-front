import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { Message } from "../../../services/models/message";
import { MessageService } from "../../../services/services/messageService";
import { AdminContainerComponent } from "../admin-container/admin-container.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, AdminContainerComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  messages: Message[] = [];
  public unreadCount: number = 0;
  showAdminContainer: boolean = true;

  constructor(private messageService: MessageService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Si la route change, cacher AdminContainerComponent sauf pour la route 'admin'
        this.showAdminContainer = event.urlAfterRedirects === '/admin';
      }
    });
  }

  ngOnInit(): void {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages.reverse();
      this.unreadCount = this.messages.filter(message => !message.read).length;
    });

    this.messageService.loadMessages();

    // Cacher AdminContainerComponent après la première visite
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
}
