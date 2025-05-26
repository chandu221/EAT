import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationService } from '../../services/information.service';
 
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  activeTab = 'general';
 
  faqCategories: string[] = [];
  faqData: any = {};
  companyInfo: any;
  primaryColor!: string;
 
  constructor(private informationService: InformationService) {}
 
  ngOnInit(): void {
    this.primaryColor = this.informationService.getPrimaryColor();
    this.companyInfo = this.informationService.getCompanyInfo();
    this.faqData = this.informationService.getFaqData();
    this.faqCategories = this.informationService.getFaqCategories();
   
    // Default to first category
    if (this.faqCategories.length > 0) {
      this.activeTab = this.faqCategories[0];
    }
  }
 
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
 
  toggleFaqItem(item: any): void {
    item.isOpen = !item.isOpen;
  }
 
  getFaqsForCategory(category: string): any[] {
    return this.faqData[category] || [];
  }
 
  formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}