import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/services/messageService';
import { DatePipe, NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { Message } from '../../../services/models/message';

@Component({
  selector: 'app-messages-received',
  standalone: true,
  imports: [NgIf, NgForOf, SlicePipe, NgClass, DatePipe],
  templateUrl: './messages-received.component.html',
  styleUrls: ['./messages-received.component.scss']
})
export class MessagesReceivedComponent implements OnInit {
  messages: Message[] = [];
  selectedMessageId: number | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getAllMessages().subscribe(
      (response: Message[] | undefined) => {
        if (response) {
          this.messages = response; // Ensure messages are defined
          console.log('Fetched messages:', this.messages); // Log the fetched messages
        } else {
          console.error('No messages found.');
        }
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  toggleMessageVisibility(message: Message) {
    if (message.id !== undefined) {
      this.selectedMessageId = this.selectedMessageId === message.id ? null : message.id;

      if (!message.read) {
        this.messageService.markAsRead(message.id).subscribe(
          () => {
            message.read = true; // Update local state
            console.log('Message marked as read:', message); // Debugging statement
          },
          error => {
            console.error('Error marking message as read:', error);
          }
        );
      }
    } else {
      console.error('Message ID is undefined');
    }
  }
  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(
      () => {
        this.messages = this.messages.filter(message => message.id !== id);
        console.log('Message deleted:', id);
      },
      error => {
        console.error('Error deleting message:', error);
      }
    );
  }
}

