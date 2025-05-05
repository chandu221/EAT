import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EquityService } from '../../services/equity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../login/services/auth.service';
 
@Component({
  selector: 'app-esop',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './esop.component.html',
  styleUrls: ['./esop.component.css']
})
export class EsopComponent implements OnInit {
  user: any;
  esopData: any;
 
  constructor(
    private router: Router,
    private EquityService: EquityService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user']; // Retrieve user data from router state
 
    // console.log('Received user data in EsopComponent:', this.user); // Log the user data
 
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
      },
      error: (err) => {
        console.error('Failed to fetch ESOP data:', err);
      },
    });
  }
  
}
 