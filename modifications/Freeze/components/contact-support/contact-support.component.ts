import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent {
  // Simple method to handle chat button click
  startChat() {
    // In a real application, this would open a chat widget or redirect to a chat page
    console.log('Starting live chat...');
    alert('Chat feature would open here');
  }
}