// faq.component.ts
 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq-container">
      <div class="header">
        <h1>EquiHub - Frequently Asked Questions</h1>
      </div>
      
      <div class="tabs">
        <button class="tab-button" [class.active]="activeTab === 'general'" (click)="activeTab = 'general'">General</button>
        

<button class="tab-button" [class.active]="activeTab === 'rsu'" (click)="activeTab = 'rsu'">RSU</button>
        

<button class="tab-button" [class.active]="activeTab === 'esop'" (click)="activeTab = 'esop'">ESOP</button>
        

<button class="tab-button" [class.active]="activeTab === 'vesting'" (click)="activeTab = 'vesting'">Vesting Schedule</button>
      </div>
      
      <!-- General FAQ Content -->
      <div class="tab-content" *ngIf="activeTab === 'general'">
        <div class="faq-item" *ngFor="let item of generalFaqs">
          <div class="question" (click)="item.isOpen = !item.isOpen">
            {{item.question}}
            <span class="toggle">{{item.isOpen ? '−' : '+'}}</span>
          </div>
          <div class="answer" [class.open]="item.isOpen" [innerHTML]="item.answer"></div>
        </div>
      </div>
      
      <!-- RSU FAQ Content -->
      <div class="tab-content" *ngIf="activeTab === 'rsu'">
        <div class="faq-item" *ngFor="let item of rsuFaqs">
          <div class="question" (click)="item.isOpen = !item.isOpen">
            {{item.question}}
            <span class="toggle">{{item.isOpen ? '−' : '+'}}</span>
          </div>
          <div class="answer" [class.open]="item.isOpen" [innerHTML]="item.answer"></div>
        </div>
      </div>
      
      <!-- ESOP FAQ Content -->
      <div class="tab-content" *ngIf="activeTab === 'esop'">
        <div class="faq-item" *ngFor="let item of esopFaqs">
          <div class="question" (click)="item.isOpen = !item.isOpen">
            {{item.question}}
            <span class="toggle">{{item.isOpen ? '−' : '+'}}</span>
          </div>
          <div class="answer" [class.open]="item.isOpen" [innerHTML]="item.answer"></div>
        </div>
      </div>
      
      <!-- Vesting FAQ Content -->
      <div class="tab-content" *ngIf="activeTab === 'vesting'">
        <div class="faq-item" *ngFor="let item of vestingFaqs">
          <div class="question" (click)="item.isOpen = !item.isOpen">
            {{item.question}}
            <span class="toggle">{{item.isOpen ? '−' : '+'}}</span>
          </div>
          <div class="answer" [class.open]="item.isOpen" [innerHTML]="item.answer"></div>
        </div>
      </div>
      
      <div class="footer">
        <p>© 2025 EquiHub. All Rights Reserved.</p>
      </div>
    </div>
  `,
  styles: [`
    .faq-container {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    
    .header {
      background-color: #006d77;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
      margin-bottom: 20px;
    }
    
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .tab-button {
      padding: 10px 20px;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    
    .tab-button.active {
      background-color: #006d77;
      color: white;
    }
    
    .tab-content {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
    }
    
    .faq-item {
      margin-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }
    
    .question {
      font-weight: bold;
      padding: 15px 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #006d77;
    }
    
    .toggle {
      font-size: 24px;
    }
    
    .answer {
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease;
      margin-left: 10px;
      opacity: 0;
    }
    
    .answer.open {
      max-height: 1000px;
      opacity: 1;
      padding-bottom: 15px;
    }
    
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #777;
    }
  `]
})
export class FaqComponent {
  activeTab = 'general';
  
  generalFaqs = [
    {
      question: 'What is EquiHub?',
      answer: 'EquiHub is a platform that helps you manage and track your equity compensation, including RSUs (Restricted Stock Units) and ESOPs (Employee Stock Option Plans).',
      isOpen: false
    },
    {
      question: 'How do I navigate between different equity types?',
      answer: 'You can use the navigation menu on the left side of the screen to switch between RSU, ESOP, and Vesting Schedule views.',
      isOpen: false
    },
    {
      question: 'What is the Tax Calculator feature?',
      answer: 'The Tax Calculator helps you estimate potential tax implications related to your equity compensation.',
      isOpen: false
    },
    {
      question: 'Where can I download my grant agreements?',
      answer: 'You can download your grant agreements from the RSU dashboard by clicking on the "Download" button under the "Grant Agreements" section.',
      isOpen: false
    },
    {
      question: 'How do I logout from the platform?',
      answer: 'You can logout by clicking on the "Logout" button located at the bottom of the left navigation menu.',
      isOpen: false
    }
  ];
  
  rsuFaqs = [
    {
      question: 'What are RSUs (Restricted Stock Units)?',
      answer: 'Restricted Stock Units (RSUs) are a form of equity compensation that represents a promise from your employer to grant you company shares after meeting certain vesting conditions.',
      isOpen: false
    },
    {
      question: 'How do I interpret my RSU dashboard?',
      answer: 'Your RSU dashboard shows key information about your restricted stock units including total stocks granted, vested stocks, unvested stocks, current stock price, and next vesting date.',
      isOpen: false
    },
    {
      question: 'What happens when my RSUs vest?',
      answer: 'When your RSUs vest, they convert into actual shares of company stock. The shares belong to you and you can choose to hold them as an investment or sell them.',
      isOpen: false
    },
    {
      question: 'When will my RSUs vest?',
      answer: 'Your next vesting date is August 30, 2025. Based on your current vesting schedule, you have 9 months and 4 days remaining until full vesting.',
      isOpen: false
    },
    {
      question: 'How is the value of my RSUs calculated?',
      answer: 'The value of your RSUs is calculated by multiplying the number of vested shares by the current stock price. For example, with 25 vested shares and a stock price of $100, your current value is $2,500.',
      isOpen: false
    }
  ];
  
  esopFaqs = [
    {
      question: 'What is an ESOP (Employee Stock Option Plan)?',
      answer: 'An Employee Stock Option Plan (ESOP) gives you the right to purchase company stock at a predetermined price (the strike or exercise price), regardless of the stock\'s market value when you exercise the option.',
      isOpen: false
    },
    {
      question: 'How do I interpret my ESOP dashboard?',
      answer: 'Your ESOP dashboard provides key information about your stock options including total stocks granted, vested stocks, unvested stocks, current stock price, discounted price, and exercised stocks.',
      isOpen: false
    },
    {
      question: 'What is the difference between Current Stock Price and Discounted Price?',
      answer: 'The Current Stock Price ($100) represents the market value of company stock. The Discounted Price ($80) is the exercise price at which you can purchase the stock through your options.',
      isOpen: false
    },
    {
      question: 'How do I exercise my stock options?',
      answer: 'To exercise your stock options, verify which options are vested, decide how many to exercise, arrange payment for the exercise price, and complete the required paperwork.',
      isOpen: false
    },
    {
      question: 'What are the tax implications of exercising my options?',
      answer: 'Tax implications vary depending on your location and option type. Generally, you may pay income tax or capital gains tax when exercising options or selling shares.',
      isOpen: false
    }
  ];
  
  vestingFaqs = [
    {
      question: 'What is vesting?',
      answer: 'Vesting is the process by which you earn the right to your equity compensation over time. Until your equity is vested, you don\'t actually own it.',
      isOpen: false
    },
    {
      question: 'How do I read my vesting schedule?',
      answer: 'Your vesting schedule shows information about each equity grant including symbol, type, award price, vested and unvested shares, final vesting date, and current value.',
      isOpen: false
    },
    {
      question: 'Why do I have multiple RSU grants with different vesting dates?',
      answer: 'Companies often grant equity regularly (annually, quarterly, or based on performance). Each grant has its own vesting schedule and parameters.',
      isOpen: false
    },
    {
      question: 'What does the "Pending" status mean?',
      answer: 'The "Pending" status indicates that the vesting process for these grants is still ongoing. Some shares have already vested, but the final vesting date has not yet been reached.',
      isOpen: false
    },
    {
      question: 'How is the Current Value calculated in the vesting schedule?',
      answer: 'The Current Value is calculated by multiplying the number of vested shares by the current market price. For example, 25 vested shares at $10 per share results in a current value of $250.',
      isOpen: false
    },
    {
      question: 'Can I see details of my future vesting dates?',
      answer: 'Yes, the vesting schedule provides information about the final vesting date for each grant. For more detailed information, you can contact your company\'s stock administration team.',
      isOpen: false
    }
  ];
}
 