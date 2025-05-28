import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router'; // Import Router
import { EquityService } from '../../services/equity.service';
import { AuthService } from '../../../../login/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

interface VestingItem {
  id: number;
  symbol: string;
  awardType: string;
  awardPrice: number;
  granted: number;
  vestedShares?: number;
  remaining?: number;
  exercisable?: number;
  remainingUnexercised?: number;
  vestedDate: string;
  vestedValue?: number;
  unvestedValue?: number;
  exercisableValue?: number;
  status: 'Pending' | 'Completed';
}


@Component({
  selector: 'app-vest',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule],
  templateUrl: './vest.component.html',
  styleUrls: ['./vest.component.css'] 
})
export class VestComponent implements OnInit {
  notifications: { message: string; submessage: string; time: string }[] = [];
  stockData: any[] = [];
  user:any;
  avatarUrl: any;
  currentIndex=0;



  constructor(
      private equityService: EquityService, 
      private router:Router,
      private authService:AuthService,
      private toastr: ToastrService,
      private notificationService: NotificationService
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
    }
  activeTab: 'rsu' | 'esop' = 'rsu';
  currentPage: number = 0;
  itemsPerPage: number = 5;

    // Add sorting state
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    rsuItems: VestingItem[] = [];
    esopItems: VestingItem[] = [];

    fetchRsuData(): void {
      const empId = localStorage.getItem("EMPID");
      if (!empId) {
        console.error("EMPID not found in localStorage");
        return;
      }
    
      this.equityService.getVestData(empId, 'rsu').subscribe(data => {
        this.rsuItems = data;
        console.log('RSU Data:', this.rsuItems);
      }, error => console.error('RSU API error:', error));
    }
    
    fetchEsopData(): void {
      const empId = localStorage.getItem("EMPID");
      if (!empId) {
        console.error("EMPID not found in localStorage");
        return;
      }
    
      this.equityService.getVestData(empId, 'esop').subscribe(data => {
        this.esopItems = data;
        console.log('ESOP Data:', this.esopItems);
      }, error => console.error('ESOP API error:', error));
    }
    
  
  ngOnInit(): void {
    this.fetchEsopData();
    this.fetchRsuData();
    this.loadNotificationData();

    // Show notifications every 25 seconds
    setInterval(() => {
      this.loadNotificationData();
    }, 45000);
  }


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

  
  // Sort functionality
  getSortedItems(items: VestingItem[]): VestingItem[] {
    if (!this.sortColumn) {
      return items;
    }
    
    return [...items].sort((a, b) => {
      // Handle different data types
      const aValue = a[this.sortColumn as keyof VestingItem];
      const bValue = b[this.sortColumn as keyof VestingItem];
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      
      // Default case
      return 0;
    });
  }
  
  // Function to handle sorting when a column header is clicked
  sort(column: string): void {
    if (this.sortColumn === column) {
      // Toggle direction if already sorting by this column
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  
  // Function to get sort indicator (up/down arrow)
  getSortIndicator(column: string): string {
    if (this.sortColumn !== column) {
      return '';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
  
  setActiveTab(tab: 'rsu' | 'esop'): void {
    this.activeTab = tab;
    this.currentPage = 0; // Reset pagination
    
    if (tab === 'rsu') {
      this.fetchRsuData();
    } else {
      this.fetchEsopData();
    }
  }
  get currentItems(): VestingItem[] {
    const items = this.activeTab === 'rsu' ? this.rsuItems : this.esopItems;
    const sortedItems = this.getSortedItems(items);
  
    const startIndex = this.currentPage * this.itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  nextPage(): void {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  getTotalPages(): number {
    const items = this.activeTab === 'rsu' ? this.rsuItems : this.esopItems;
    return Math.ceil(items.length / this.itemsPerPage);
  }


  loadNotificationData(): void {
    const empId = localStorage.getItem("EMPID");
  
    if (!empId) {
      console.error("EMPID not found in localStorage");
      return;
    }

    this.equityService.getNotifyData(empId).subscribe({
      next: (data: any) => {
        this.stockData = data;
        this.generateNotificationsFromStockData(data);
      },
      error: (error) => {
        console.error('Error fetching notification data:', error);
        this.toastr.error('Failed to load notifications', 'Error');
        // Fallback to empty notifications or show error message
        this.notifications = [];
      }
    });
  }

  generateNotificationsFromStockData(data: any): void {
    this.notifications = [];

    // Stock price change notification
    const priceChangeMessage = data.percentChange >= 0 
      ? `Stock Price Increase` 
      : `Stock Price Decrease`;
    
    const priceChangeSubmessage = data.percentChange >= 0
      ? `${data.symbol} stock price has increased by ${Math.abs(data.percentChange)}%`
      : `${data.symbol} stock price has decreased by ${Math.abs(data.percentChange)}%`;

    this.notifications.push({
      message: priceChangeMessage,
      submessage: priceChangeSubmessage,
      time: new Date().toLocaleTimeString()
    });

    // High price notification
    this.notifications.push({
      message: 'Stock Price High',
      submessage: `${data.symbol} reached a high of $${data.high.toFixed(2)}`,
      time: new Date().toLocaleTimeString()
    });

    // Low price notification
    this.notifications.push({
      message: 'Stock Price Low',
      submessage: `${data.symbol} reached a low of $${data.low.toFixed(2)}`,
      time: new Date().toLocaleTimeString()
    });

    // RSU vesting notification (only if there are vested RSUs)
    if (data.rsu.recentVested > 0) {
      this.notifications.push({
        message: 'RSU Vested',
        submessage: `${data.rsu.recentVested} RSU stocks are vested`,
        time: data.rsu.dateOfVested
      });
    }

    // ESOP vesting notification (only if there are vested ESOPs)
    if (data.esop.recentVested > 0) {
      this.notifications.push({
        message: 'ESOP Vested',
        submessage: `${data.esop.recentVested} ESOP stocks are vested`,
        time: data.esop.dateOfVested
      });
    }

    // Show toast notification for the latest update
    if (this.notifications.length > this.currentIndex) {
      const latestNotification = this.notifications[this.currentIndex];
      this.currentIndex++;
      const toast=this.toastr.info(latestNotification.submessage, latestNotification.message);
      toast.onTap.subscribe(() => {
        this.router.navigate(['/notification']);})
    }
    
  }

  
}
