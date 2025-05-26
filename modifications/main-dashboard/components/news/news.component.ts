import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { InformationService } from '../../services/information.service';
 
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
      <h1 class="news-title">{{ sectionTitle }}</h1>
     
      <div class="news-list">
        <div
          *ngFor="let item of newsItems; trackBy: trackById"
          class="news-item"
          [class.new-item]="item.isNew"
        >
          <div class="news-date">{{ item.date | date: dateFormat }}</div>
          <div class="news-content">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-text">{{ item.content }}</p>
          </div>
          <div *ngIf="item.isNew" class="new-badge">{{ newBadgeText }}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];
  sectionTitle = '';
  dateFormat = '';
  newBadgeText = '';
  trackById: TrackByFunction<NewsItem> = (index, item) => item.id;
 
  constructor(private infoService: InformationService) {}
 
  ngOnInit(): void {
    
    const newsSection = this.infoService.getNewsSection();
    this.sectionTitle = newsSection.title;
    this.dateFormat = newsSection.dateFormat;
    this.newBadgeText = newsSection.newBadgeText;
   
    
    this.newsItems = this.infoService.getNewsItems();
  }
}
 