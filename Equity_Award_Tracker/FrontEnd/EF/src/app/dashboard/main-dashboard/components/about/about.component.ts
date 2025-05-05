// about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  primaryColor = '#5f9991';
  
  // Card hover states
  missionHovered = false; 
  visionHovered = false;
  valuesHovered = false;
  
  onCardHover(card: string, isHovered: boolean): void {
    switch(card) {
      case 'mission':
        this.missionHovered = isHovered;
        break;
      case 'vision':
        this.visionHovered = isHovered;
        break;
      case 'values':
        this.valuesHovered = isHovered;
        break;
    }
  }
}