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
  selector: 'app-rsu',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './rsu.component.html',
  styleUrls: ['./rsu.component.css']
})
export class RsuComponent implements OnInit {
  user:any;
  esopData: any;
  granted!: number;
  vested!: number;
  unvested!: number;
  currentValue!: number;
  nextVestingDate!: string; // dd/mm/yyyy format
  vestingProgressPercentage!: number;
  previousVestingDate!: string; // dd/mm/yyyy format
  timeToFullVest!: string; // Time left for full vesting
  errorMessage: string = '';
 
  constructor(
    private equityService: EquityService, 
    private router:Router,
    private authService:AuthService

  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user']; // Retrieve user data from router state 
    // Fallback to localStorage or AuthService if user data is missing
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
  }
 
  ngOnInit(): void {
    this.fetchRsuData();
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
      },
      error: (err) => {
        console.error('Failed to fetch ESOP data:', err);
      },
    });
  }


  fetchRsuData():void{
    const empId = localStorage.getItem("EMPID");

    if (!empId) {
      console.error("EMPID not found in localStorage");
      return;
    }
  this.equityService.getRsuData(empId).subscribe({
    next:(rsuData:any)=>{
      console.log("RSU Data___",rsuData)
      if (rsuData) {
        this.granted = rsuData.granted ?? 0;
        this.vested = rsuData.vested ?? 0;
        this.unvested = rsuData.unvested ?? 0;
        this.currentValue = rsuData.currentValue ?? 0;
        this.vestingProgressPercentage = rsuData.vestingProgressPercentage ?? 0;
        this.timeToFullVest = rsuData.timeToFullVest;

        // Format next vesting date
        this.nextVestingDate = this.formatDate(rsuData.nextVestingDate);

        // Extract and format previous vesting date
        if (rsuData.vestHistory && rsuData.vestHistory.length > 0) {
          this.previousVestingDate = this.formatDate(rsuData.vestHistory[0].vestDate);
        } else {
          this.previousVestingDate = 'N/A';
        }
      }
  },
  });
  

  }
 
  downloadPdf(): void {
    this.equityService.downloadPdf('grant agreements');

  }
  
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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



  

  // private formatTime(timeString: string): string {
  //   // Extract total days from timeString
  //   const [daysString] = timeString.split('.');
  //   const totalDays = parseInt(daysString, 10);
  
  //   // Convert days into years, months, and remaining days
  //   const years = Math.floor(totalDays / 365);
  //   const remainingDaysAfterYears = totalDays % 365;
  //   const months = Math.floor(remainingDaysAfterYears / 30);
  //   const remainingDays = remainingDaysAfterYears % 30;
  
  //   return `${years} years, ${months} months, ${remainingDays} days`;
  // }
  
}