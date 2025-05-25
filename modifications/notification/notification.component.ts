import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from '../footer/footer.component';
import { EquityService } from '../../services/equity.service';  
import { Router } from '@angular/router';
import { AuthService } from '../../../../login/services/auth.service';

@Component({
  selector: 'app-notification',
  imports: [FooterComponent,CommonModule],
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // notifications: { message: string; submessage: string; time: string }[] = [];
 notifications: { message: string; submessage: string; time: string }[] = [];
 stockData: any[] = [];
 user: any;

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private equityService: EquityService,
    private authService: AuthService
  )
   {
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
    this.loadNotificationData();
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
    if (this.notifications.length > 0) {
      const latestNotification = this.notifications[0];
      this.toastr.info(latestNotification.submessage, latestNotification.message);
    }
  }

  // Method to refresh notifications
  refreshNotifications(): void {
    this.loadNotificationData();
  }

  goBack(): void {
    this.location.back();
  }
}