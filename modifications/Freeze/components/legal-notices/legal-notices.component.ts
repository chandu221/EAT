import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../services/information.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-notices.component.html',
  styleUrls: ['./legal-notices.component.scss']
})
export class LegalNoticesComponent implements OnInit {
  legalNotices: any;
  
  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.legalNotices = this.informationService.getLegalNotices();
  }
}