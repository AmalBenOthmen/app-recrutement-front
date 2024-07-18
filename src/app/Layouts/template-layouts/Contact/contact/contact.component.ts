import { Component } from '@angular/core';
import { MessageService } from "../../../../services/services/messageService";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  messageForm: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private messageService: MessageService) {}

  sendMessage() {
    this.messageService.saveMessage(this.messageForm)
      .subscribe(response => {
        console.log('Message sent successfully:', response);
        this.successMessage = 'Message sent successfully!';
        this.errorMessage = null;
        this.messageForm = {}; // Optionally, reset the form fields
      }, error => {
        console.error('Error sending message:', error);
        this.errorMessage = 'Failed to send message. Please try again.';
        this.successMessage = null;
      });
  }

  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
