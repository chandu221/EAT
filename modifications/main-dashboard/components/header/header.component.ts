import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
 
@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Input() pageTitle: string = "";
  @Input() currentStockPrice = "";
  @Input() stockPrice: string = "";
  @Input() userName: string = "";
  @Input() activePage: string = "";
  @Input() discountedPrice: string = "";
  @Input() showStockPrice: boolean = true;

  avatarUrl = "hihih";
  constructor(private router:Router) {}
  ngOnInit() {
    const seed = this.userName || "default"; // use username to keep avatar consistent
    this.avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      seed
    )}`;
  }
}