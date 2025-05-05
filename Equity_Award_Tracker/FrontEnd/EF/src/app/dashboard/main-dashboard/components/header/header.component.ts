import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() pageTitle: string = '';
  @Input() currentStockPrice='';
  @Input() stockPrice: string= '';
  @Input() userName: string = '';
  @Input() activePage: string = '';
  @Input() discountedPrice: string = '';
  @Input() showStockPrice: boolean = true;
}