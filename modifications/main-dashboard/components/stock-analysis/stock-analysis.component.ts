import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EquityService } from '../../services/equity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../login/services/auth.service';
import { FormsModule } from '@angular/forms';
import { EsopAdvisorService } from '../../services/google-ai.service';

@Component({
  selector: 'app-stock-analysis',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './stock-analysis.component.html',
  styleUrls: ['./stock-analysis.component.css']
})
export class StockAnalysisComponent implements OnInit {
  analysisResult: string = '';
  user: any;
  esopData: any;

  constructor(
    private esopAdvisorService: EsopAdvisorService,
    private router: Router,
    private equityService: EquityService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'] ?? JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.user?.emp_id) {
      const empId = this.authService.getEmpId();
      if (empId) this.user = { emp_id: empId };
    }

    console.log('Final user object:', this.user);
  }

  ngOnInit(): void {
    this.fetchEsopData();
  }

  fetchEsopData(): void {
    const empId = localStorage.getItem("EMPID");
    if (!empId) {
      console.error("EMPID not found in localStorage");
      return;
    }

    this.equityService.getEsopData(empId).subscribe({
      next: (data) => {
        this.esopData = data;
        console.log('ESOP Data:', this.esopData);
        this.fetchAnalysis(); // Call AI analysis after fetching data
      },
      error: (err) => console.error('Failed to fetch ESOP data:', err),
    });
  }

  async fetchAnalysis() {
    try {
      if (!this.esopData) {
        console.error('ESOP data is unavailable for analysis.');
        return;
      }
  
      console.log('Sending ESOP data to AI:', this.esopData);
  
      this.analysisResult = await this.esopAdvisorService.getEsopAdvice(this.esopData);
  
      console.log('Received AI Response:', this.analysisResult);
    } catch (error) {
      console.error('Error fetching AI-generated insights:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2)); // Pretty-print error details
    }
  }
}