import { Component } from '@angular/core';


import { AssistantRequest, AssistantService } from '../dashboard/main-dashboard/services/assistant.service';
import { AssistantResponse } from '../dashboard/main-dashboard/services/assistant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule,  FormsModule ],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.css'
  //   styleUrls: ['./assistant.component.css']
})
export class AssistantComponent {
   

 
    history: { from: 'user'|'bot', text: string }[] = [];
    current = '';
    title = "Assistant";
    constructor(private svc: AssistantService) {}
   
    send() {
      if (!this.current.trim()) return;
      this.history.push({ from: 'user', text: this.current });
      this.svc.ask(this.current).subscribe((res: AssistantResponse) => {
        this.history.push({ from: 'bot', text: res.reply });
      });
      this.current = '';
    }
  }

