import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EquityService } from '../../services/equity.service';
 
interface Feature {
  title: string;
  description: string;
  icon: string;
}
 
@Component({
  selector: 'app-key-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key-features.component.html',
  styleUrls: ['./key-features.component.scss']
})
export class KeyFeaturesComponent {
  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['']); // Navigate to Login Page
  }
  logoPath: string | undefined;
  features: Feature[] = [
    {
      title: 'Equity Dashboard',
      description: 'Comprehensive view of all your RSUs and ESOPs in one place with real-time valuations based on current stock prices.',
      icon: 'dashboard'
    },
    {
      title: 'Vesting Tracker',
      description: 'Visual tracking of vesting progress with timelines and countdown to your next vesting date.',
      icon: 'timeline'
    },
    {
      title: 'Tax Calculator',
      description: 'Calculate potential tax implications for exercising options or selling vested shares at different price points.',
      icon: 'calculate'
    },
    {
      title: 'Grant Management',
      description: 'View and download grant agreements and keep track of multiple equity awards across different vesting schedules.',
      icon: 'description'
    },
    {
      title: 'Exercise Planner',
      description: 'Plan and track exercised stocks with remaining stocks to exercise for optimal financial planning.',
      icon: 'trending_up'
    },
    {
      title: 'Value Projections',
      description: 'See current market value of your equity and project future values based on potential stock price changes.',
      icon: 'assessment'
    }
  ];
}
 