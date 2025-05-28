// import { Component } from '@angular/core';
// import { TrendService } from '../../services/trendService';
// import { TrendResponse } from '../../services/trendService'; // Adjust the import path as necessary
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { RouterModule } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-trend',
//   standalone: true,
//   // imports: [],
//   imports: [CommonModule, FormsModule,SidebarComponent, RouterModule],

  
  

//   templateUrl: './trend.component.html',
//   //styleUrl: './trend.component.css'
//    styleUrls: ['./trend.component.css'],
// })
// export class TrendComponent {
 
   

//   symbol: string = '';
//     pricesInput: string = '';
//     trendResult: string | null = null;
//     errorMessage: string | null = null;
   
//     constructor(private trendService: TrendService) {}
   
//     checkTrend() {
//       this.errorMessage = null;
//       this.trendResult = null;
   
//       // Parse input string into number array
//       const prices = this.pricesInput
//         .split(',')
//         .map((p) => parseFloat(p.trim()))
//         .filter((p) => !isNaN(p));
   
//       if (prices.length === 0) {
//         this.errorMessage = 'Please enter valid comma-separated numbers.';
//         return;
//       }
   
//       this.trendService.getTrend(prices).subscribe({
//         next: (res: TrendResponse) => {
//           this.trendResult = res.trend;
//         },
//         error: (err: { message: string; }) => {
//           this.errorMessage = 'API error: ' + err.message;
//         },
//       });
//     }
   
//     getColor(trend: string): string {
//       switch (trend.toLowerCase()) {
//         case 'bullish':
//           return 'green';
//         case 'bearish':
//           return 'red';
//         case 'stable':
//           return 'gray';
//         default:
//           return 'black';
//       }
//     }
//   }

