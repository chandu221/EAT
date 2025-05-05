// news-updates.component.ts
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
 
interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  isNew?: boolean;
}
 
@Component({
  selector: 'app-news-updates',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
  
    <div class="news-container">
      <h1 class="news-title">News & Updates</h1>
      
      <div class="news-list">
<div *ngFor="let item of newsItems; trackBy: trackById" class="news-item" [class.new-item]="item.isNew">
  <div class="news-date">{{ item.date | date: 'MMM d' }}</div>
  <div class="news-content">
    <h3 class="item-title">{{ item.title }}</h3>
    <p class="item-text">{{ item.content }}</p>
  </div>
  <div *ngIf="item.isNew" class="new-badge">New</div>
</div>
      </div>
    </div>
  `,
  styles: [`
    .news-container {
      font-family: 'Segoe UI', 'Inter', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    
    .news-title {
      color: #1a3a6c;
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .news-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .news-item {
      display: flex;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: transform 0.2s ease;
      position: relative;
    }
    
    .news-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .news-date {
      background-color: #f1f5f9;
      color: #475569;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      text-align: center;
    }
    
    .news-content {
      padding: 1rem 1.5rem;
      flex: 1;
    }
    
    .item-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 0.5rem;
    }
    
    .item-text {
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .new-item {
      border-left: 4px solid #3b82f6;
    }
    
    .new-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: #3b82f6;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    
    @media (max-width: 600px) {
      .news-item {
        flex-direction: column;
      }
      
      .news-date {
        width: 100%;
        padding: 0.5rem;
      }
    }
  `]
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];
trackById: TrackByFunction<NewsItem> = (index, item) => item.id;
 
  ngOnInit(): void {
    // In a real app, this would come from a service
    this.newsItems = [
      {
        id: 1,
        title: 'Quarterly Vesting Schedule Updated',
        date: '2025-04-28',
        content: 'Your Q2 vesting schedule has been updated. Check your dashboard for details on upcoming vests.',
        isNew: true
      },
      {
        id: 2,
        title: 'New Tax Documents Available',
        date: '2025-04-20',
        content: 'Tax documents for your recent equity transactions are now available for download in your account.'
      },
      {
        id: 3,
        title: 'Platform Maintenance Complete',
        date: '2025-04-15',
        content: 'Our scheduled maintenance is complete. New performance improvements have been implemented.'
      },
      {
        id: 4,
        title: 'Mobile Experience Enhancements',
        date: '2025-04-10',
        content: 'We have improved the mobile experience with faster loading times and simplified navigation.'
      },
      {
        id: 5,
        title: 'Year-End Tax Planning Resources',
        date: '2025-04-05',
        content: 'Check out our new resources on tax planning strategies for your equity compensation.'
      }
    ];
  }
}