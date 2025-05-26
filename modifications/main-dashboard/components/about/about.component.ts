import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationService } from '../../services/information.service';
 
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  primaryColor!: string;
  companyInfo: any;
  assetsPath!: string;
  [index: string]: any;
 
  // Card hover states
  missionHovered = false;
  visionHovered = false;
  valuesHovered = false;
 
  constructor(private informationService: InformationService) {}
 
  ngOnInit(): void {
    this.primaryColor = this.informationService.getPrimaryColor();
    this.companyInfo = this.informationService.getCompanyInfo();
    this.assetsPath = this.informationService.getAssetsPath();
  }
 
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
 