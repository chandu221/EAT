import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router'; // Import Router

interface VestingItem {
  id: number;
  symbol: string;
  type: string;
  awardPrice: number;
  granted: number;
  vested?: number;
  remaining?: number;
  exercisable?: number;
  remainingUnexercised?: number;
  finalDate: string;
  currentValue?: number;
  unvestedValue?: number;
  exercisableValue?: number;
  status: 'Pending' | 'Completed';
}

@Component({
  selector: 'app-vest',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './vest.component.html',
  styleUrls: ['./vest.component.css'] 
})
export class VestComponent implements OnInit {
  activeTab: 'rsu' | 'esop' = 'rsu';
  currentPage: number = 0;
  itemsPerPage: number = 5;

    // Add sorting state
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';

  
  
  rsuItems: VestingItem[] = [
    {
      id: 1, symbol: 'IBM', type: 'RSU', awardPrice: 10, vested: 25, remaining: 75, finalDate: '21/06/2025', currentValue: 250, status: 'Pending',
      granted: 0
    },
    {
      id: 2, symbol: 'IBM', type: 'RSU', awardPrice: 10, vested: 31, remaining: 69, finalDate: '21/06/2026', currentValue: 310, status: 'Pending',
      granted: 0
    },
    {
      id: 3, symbol: 'IBM', type: 'RSU', awardPrice: 12, vested: 40, remaining: 80, finalDate: '01/01/2026', currentValue: 480, status: 'Pending',
      granted: 0
    },
    {
      id: 4, symbol: 'IBM', type: 'RSU', awardPrice: 15, vested: 20, remaining: 70, finalDate: '15/03/2027', currentValue: 300, status: 'Pending',
      granted: 0
    },
    {
      id: 5, symbol: 'IBM', type: 'RSU', awardPrice: 13, vested: 15, remaining: 65, finalDate: '30/09/2026', currentValue: 195, status: 'Pending',
      granted: 0
    },
    {
      id: 6, symbol: 'AAPL', type: 'RSU', awardPrice: 150, vested: 10, remaining: 40, finalDate: '15/07/2025', currentValue: 1500, status: 'Pending',
      granted: 0
    },
    {
      id: 7, symbol: 'GOOGL', type: 'RSU', awardPrice: 200, vested: 5, remaining: 15, finalDate: '30/03/2026', currentValue: 1000, status: 'Completed',
      granted: 0
    },
    {
      id: 8, symbol: 'MSFT', type: 'RSU', awardPrice: 120, vested: 30, remaining: 0, finalDate: '10/01/2025', currentValue: 3600, status: 'Completed',
      granted: 0
    },
    {
      id: 9, symbol: 'AMZN', type: 'RSU', awardPrice: 180, vested: 15, remaining: 35, finalDate: '22/05/2027', currentValue: 2700, status: 'Pending',
      granted: 0
    },
    {
      id: 10, symbol: 'META', type: 'RSU', awardPrice: 100, vested: 25, remaining: 25, finalDate: '19/11/2025', currentValue: 2500, status: 'Pending',
      granted: 0
    }
  ];
  
  esopItems: VestingItem[] = [
    {
      id: 1, symbol: 'IBM', type: 'ESOP', awardPrice: 10, vested: 37, exercisable: 30, remainingUnexercised: 7, finalDate: '21/06/2027', status: 'Pending',
      granted: 0
    },
    {
      id: 2, symbol: 'IBM', type: 'ESOP', awardPrice: 10, vested: 43, exercisable: 40, remainingUnexercised: 3, finalDate: '21/06/2028', status: 'Pending',
      granted: 0
    },
    {
      id: 3, symbol: 'IBM', type: 'ESOP', awardPrice: 10, vested: 50, exercisable: 50, remainingUnexercised: 0, finalDate: '21/06/2029', status: 'Completed',
      granted: 0
    },
    {
      id: 4, symbol: 'IBM', type: 'ESOP', awardPrice: 9, vested: 50, exercisable: 45, remainingUnexercised: 5, finalDate: '11/11/2028', status: 'Pending',
      granted: 0
    },
    {
      id: 5, symbol: 'IBM', type: 'ESOP', awardPrice: 11, vested: 35, exercisable: 30, remainingUnexercised: 5, finalDate: '10/10/2029', status: 'Pending',
      granted: 0
    },
    {
      id: 6, symbol: 'AAPL', type: 'ESOP', awardPrice: 145, vested: 20, exercisable: 15, remainingUnexercised: 5, finalDate: '05/08/2026', status: 'Pending',
      granted: 0
    },
    {
      id: 7, symbol: 'GOOGL', type: 'ESOP', awardPrice: 190, vested: 10, exercisable: 10, remainingUnexercised: 0, finalDate: '12/04/2025', status: 'Completed',
      granted: 0
    },
    {
      id: 8, symbol: 'MSFT', type: 'ESOP', awardPrice: 125, vested: 40, exercisable: 35, remainingUnexercised: 5, finalDate: '25/02/2027', status: 'Pending',
      granted: 0
    },
    {
      id: 9, symbol: 'AMZN', type: 'ESOP', awardPrice: 175, vested: 25, exercisable: 20, remainingUnexercised: 5, finalDate: '18/09/2028', status: 'Pending',
      granted: 0
    },
    {
      id: 10, symbol: 'META', type: 'ESOP', awardPrice: 95, vested: 30, exercisable: 30, remainingUnexercised: 0, finalDate: '07/12/2026', status: 'Completed',
      granted: 0
    }
  ];
  
  constructor(private router: Router) {} 
  
  ngOnInit(): void {}
  navigateToAbout(): void {
    this.router.navigate(['/about']); // Navigate to About Page
  }

  navigateToFeatures(): void {
    this.router.navigate(['/features']); // Navigate to Key Features Page
  }

  navigateToNews(): void {
    this.router.navigate(['/news']); // Navigate to News & Updates Page
  }

  navigateToFaq(): void {
    this.router.navigate(['/faq']); 
  }
  
  get currentRsuItems(): VestingItem[] {
    // Get sorted items
    const sortedItems = this.getSortedItems(this.rsuItems);
    
    // Paginate the sorted items
    const startIndex = this.currentPage * this.itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get currentEsopItems(): VestingItem[] {
    // Get sorted items
    const sortedItems = this.getSortedItems(this.esopItems);
    
    // Paginate the sorted items
    const startIndex = this.currentPage * this.itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + this.itemsPerPage);
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
    this.currentPage = 0; // Reset to first page when changing tabs
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

  
}
