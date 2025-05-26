import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() footerType: string = '';
  @Input() notify: boolean = false; // Input to check if notify is true

  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {} // Inject Router

  navigateToFeatures(): void {
    this.router.navigate(['/features']); // Navigate to the Features Page
    
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']); 


  }

  navigateToNews(): void {
    this.router.navigate(['/news']); 
}

navigateToFaq(): void {
  this.router.navigate(['/faq']); 
}

navigateToGlossary(): void {
  this.router.navigate(['/glossary']); 
}
navigateToTaxInformation(): void {
  this.router.navigate(['/tax-information']);

}
navigateToLegalNotices(): void {
  this.router.navigate(['/legal-notices']);
}

navigateToSuggestionsFeedback(): void {
  this.router.navigate(['/suggestions-feedback']);
}

navigateToContactSupport(): void {
  this.router.navigate(['/contact-support']);
}
}