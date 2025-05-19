import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit() {
    const seed = this.userName || "default"; // use username to keep avatar consistent
    this.avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      seed
    )}`;
  }
}