import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Router } from '@angular/router';
import { InformationService } from '../../services/information.service';
 
@Component({
  selector: 'app-key-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key-features.component.html',
  styleUrls: ['./key-features.component.scss']
})
export class KeyFeaturesComponent implements OnInit {
  primaryColor: string;
  companyName: string;
  taglines: string[];
  features: any[] = [];
  content: any = {};
 
  constructor(
    private router: Router,
    private informationService: InformationService,
    private location: Location
  ) {
    this.primaryColor = '';
    this.companyName = '';
    this.taglines = [];
  }
 
  ngOnInit(): void {
    this.primaryColor = this.informationService.getPrimaryColor();
    const companyInfo = this.informationService.getCompanyInfo();
    this.companyName = companyInfo.name;
    this.taglines = companyInfo.taglines;
    this.features = this.informationService.getFeatures();
    this.content = this.informationService.getKeyFeaturesContent();
  }
 
  navigateToLogin(): void {
    this.location.back();
  }
}
 