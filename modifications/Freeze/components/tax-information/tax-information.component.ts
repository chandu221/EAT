import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../services/information.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tax-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class TaxInformationComponent implements OnInit {
  taxInformation: any;
  
  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.taxInformation = this.informationService.getTaxInformation();
  }
}