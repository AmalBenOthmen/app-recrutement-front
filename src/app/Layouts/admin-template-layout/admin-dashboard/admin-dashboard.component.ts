import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule, RouterOutlet} from "@angular/router";
import {Message} from "../../../services/models/message";
import {MessageService} from "../../../services/services/messageService";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    RouterOutlet,

  ],

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  messages: Message[] = [];
  public unreadCount: number=0;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages.reverse();
      this.unreadCount = this.messages.filter(message => !message.read).length;
    });

    this.messageService.loadMessages();
  }

  markAllAsRead() {
    this.messages.forEach(message => {
      if (!message.read) {
        this.messageService.markAsRead(message.id!).subscribe();
      }
    });
  }}
