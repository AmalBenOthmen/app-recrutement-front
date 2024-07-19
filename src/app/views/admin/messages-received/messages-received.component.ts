import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../services/services/messageService";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {Message} from "../../../services/models/message";

@Component({
  selector: 'app-messages-received',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SlicePipe
  ],
  templateUrl: './messages-received.component.html',
  styleUrl: './messages-received.component.scss'
})
export class MessagesReceivedComponent implements OnInit {
  messages: Message[] = [];
  selectedMessageId: number | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getUnreadMessages().subscribe(
      (response: Message[]) => {
        this.messages = response.reverse();
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  toggleMessageVisibility(messageId: number) {
    this.selectedMessageId = this.selectedMessageId === messageId ? null : messageId;
  }
}
