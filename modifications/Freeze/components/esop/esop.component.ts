import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EquityService } from '../../services/equity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../login/services/auth.service';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-esop',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './esop.component.html',
  styleUrls: ['./esop.component.css']
})
export class EsopComponent implements OnInit {
  user: any;
  esopData: any;
  currentValue!: number;

 
  constructor(
    private router: Router,
    private EquityService: EquityService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user']; 
    
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }
 
    if (!this.user) {
      const empId = this.authService.getEmpId();
      if (empId) {
        this.user = { emp_id: empId };
      }
    }
 
    console.log('Final user object in EsopComponent:', this.user); // Console Log the final user object
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
  
    this.EquityService.getEsopData(empId).subscribe({
      next: (data) => {
        this.esopData = data;
        console.log('ESOP Data:', this.esopData);
        this.currentValue=this.esopData?.currentMarketValue;
      },
      error: (err) => {
        console.error('Failed to fetch ESOP data:', err);
      },
    });
  }

  selectedTaxType: string = 'Total'; // Default selection
  // Example value, can be fetched dynamically
 taxRates = { federal: 0.2, state: 0.07, local: 0.03 };
 aftertax:number = this.currentValue;

  getCurrentValue(): number {
    let totalTax = 0;
    let awardPrice: number = this.currentValue;
    
    console.log(awardPrice);

    switch (this.selectedTaxType.toLowerCase()) {
      case 'federal':
        totalTax = awardPrice * this.taxRates.federal;
        break;
      case 'state':
        totalTax = awardPrice * this.taxRates.state;
        break;
      case 'local':
        totalTax = awardPrice * this.taxRates.local;
        break;
      case 'total':
        totalTax = awardPrice * (this.taxRates.federal + this.taxRates.state + this.taxRates.local);
        break;
    }
    this.aftertax = parseFloat((awardPrice - totalTax).toFixed(2));
    return this.aftertax
  }
  
}
 