import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = [
    { message: 'Stock Price Update', submessage: 'The stock price has decreased by 0.06%', time: new Date().toLocaleTimeString() },
    { message: 'Stock Price Alert', submessage: 'The stock price has reached a new high 89.84%.', time:new Date().toLocaleTimeString() },
    { message: 'Stock Price Drop', submessage: 'The stock price has decreased to $88.80.', time: new Date().toLocaleTimeString() },
    { message: 'Stock Price Prediction', submessage: 'Analysts predict a $0.90 per share increase in stock price this quarter.', time: new Date().getDay().toString() },
  ];

  private currentIndex = 0;

  constructor() {}

  getNextNotification(): { message: string; submessage: string; time: string } | null {
    if (this.currentIndex < this.notifications.length) {
      const notification = this.notifications[this.currentIndex];
      this.currentIndex++;
      return notification;
    }
    return null; // No more notifications
  }
}
