import { Injectable } from '@angular/core';
 
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}
 
interface Feature {
  title: string;
  description: string;
  icon: string;
}
 
interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  isNew?: boolean;
}
 
interface NewsSection {
  title: string;
  dateFormat: string;
  newBadgeText: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private readonly primaryColor = '#5f9991';
  private readonly secondaryColor = '#1a3a6c';
  private readonly accentColor = '#3b82f6';
  private readonly assetsPath = 'assets/';
 
  private readonly companyInfo = {
    name: 'EquiHub',
    taglines: ['Own It', 'Track It', 'Grow It'],
   
    aboutSection: {
      title: 'About Us',
      paragraphs: [
        'At EquiHub, we believe that understanding and managing your equity awards should be empowering, not overwhelming. Founded in 2025, we set out to create a solution that brings clarity and control to employee equity ownership.',
        'Our journey began when our founding team, recognized a common challenge: employees often struggled to truly understand the value and potential of their equity compensation. We saw an opportunity to bridge this knowledge gap with an intuitive platform designed specifically for equity award tracking.',
        'Today, EquiHub serves professionals across industries who use our platform to monitor their RSUs and ESOPs with confidence. Our dedicated team continues to innovate, guided by our commitment to financial empowerment through technology.'
      ]
    },
   
    infoCards: [
      {
        id: 'mission',
        title: 'Our Mission',
        description: 'To demystify equity compensation and empower employees to make informed decisions about their financial future.'
      },
      {
        id: 'vision',
        title: 'Our Vision',
        description: 'A world where every equity holder confidently understands, tracks, and maximizes the potential of their ownership stake.'
      },
      {
        id: 'values',
        title: 'Our Values',
        description: 'Transparency, accuracy, accessibility, and continuous innovation drive everything we do at EquiHub.'
      }
    ],
   
    newsSection: {
      title: 'News & Updates',
      dateFormat: 'MMM d',
      newBadgeText: 'New'
    },
   
    copyright: '© 2025 EquiHub. All rights reserved.'
  };
 
  private readonly newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'New Equity Award Features Released',
      date: '2025-04-28',
      content: 'We have introduced new features to help you better track and manage your equity awards. Explore them in your dashboard.',
      isNew: true
    },
    {
      id: 2,
      title:'Improved Dashboard Analytics',
      date: '2025-04-20',
      content: 'Your dashboard now includes enhanced analytics to provide deeper insights into your equity performance.'
    },
    {
      id: 3,
      title: 'Platform Maintenance Complete',
      date: '2025-04-15',
      content: 'Our scheduled maintenance is complete. New performance improvements have been implemented.'
    },
    {
      id: 4,
      title: 'New Tax Calculator Feature',
      date: '2025-04-10',
      content: 'We have added a new tax calculator feature to help you estimate your tax liabilities on equity transactions.'
    },
    {
      id: 5,
      title:'Upcoming Maintenance Notification',
      date: '2025-04-05',
      content: 'Scheduled maintenance will occur on April 15th from 12:00 AM to 4:00 AM. The platform may be temporarily unavailable during this time.'
    }
  ];
 
  private readonly features: Feature[] = [
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
 
  private readonly keyFeaturesContent = {
    title: 'Key Features',
    subtitle: 'EquiHub provides powerful tools to help you manage and optimize your equity compensation',
    ctaText: 'Ready to take control of your equity compensation?',
    ctaButtonText: 'Get Started',
    ctaLink: '/signup'
  };
 
  private readonly faqData: Record<string, FaqItem[]> = {
    general: [
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
    ],
   
    rsu: [
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
        answer: 'Your next vesting date is shown on your dashboard. The vesting schedule page provides detailed information about all vesting dates for your equity grants.',
        isOpen: false
      },
      {
        question: 'How is the value of my RSUs calculated?',
        answer: 'The value of your RSUs is calculated by multiplying the number of vested shares by the current stock price. For example, with 25 vested shares and a stock price of $100, your current value is $2,500.',
        isOpen: false
      }
    ],
   
    esop: [
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
        answer: 'The Current Stock Price represents the market value of company stock. The Discounted Price is the exercise price at which you can purchase the stock through your options.',
        isOpen: false
      },
      {
        question: 'How do I exercise my stock options?',
        answer: 'To exercise your stock options, navigate to the Exercise section of your ESOP dashboard, select the options you wish to exercise, and follow the guided process.',
        isOpen: false
      },
      {
        question: 'What are the tax implications of exercising my options?',
        answer: 'Tax implications vary depending on your location and option type. Use our Tax Calculator feature to get estimates for your specific situation.',
        isOpen: false
      }
    ],
   
    vesting: [
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
        answer: 'The Current Value is calculated by multiplying the number of vested shares by the current market price.',
        isOpen: false
      },
      {
        question: 'Can I see details of my future vesting dates?',
        answer: 'Yes, the vesting schedule provides information about the final vesting date for each grant. You can also view a detailed timeline by clicking on any grant.',
        isOpen: false
      }
    ]
  };
 
  constructor() { }
 
  /**
   * Returns the application's primary color
   */
  getPrimaryColor(): string {
    return this.primaryColor;
  }
 
  /**
   * Returns the application's secondary color
   */
  getSecondaryColor(): string {
    return this.secondaryColor;
  }
 
  /**
   * Returns the application's accent color
   */
  getAccentColor(): string {
    return this.accentColor;
  }
 
 
  getAssetsPath(): string {
    return this.assetsPath;
  }
 
 
  getCompanyInfo(): any {
    return this.companyInfo;
  }
 
  /**
   * Returns specific section of company information
   * @param section - The section name to retrieve
   */
  getCompanyInfoSection(section: string): any {
    return this.companyInfo[section as keyof typeof this.companyInfo];
  }
 
 
  getNewsSection(): NewsSection {
    return this.companyInfo.newsSection;
  }
 
 
  getNewsItems(): NewsItem[] {
    return this.newsItems;
  }
 
  /**
   * Returns a specific news item by ID
   * @param id - The ID of the news item to retrieve
   */
  getNewsItemById(id: number): NewsItem | undefined {
    return this.newsItems.find(item => item.id === id);
  }
 
  /**
   * Returns the latest news items
   * @param count - The number of latest items to retrieve
   */
  getLatestNews(count: number): NewsItem[] {
    return [...this.newsItems]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
 
 
  getFeatures(): Feature[] {
    return this.features;
  }
 
 
  getKeyFeaturesContent(): any {
    return this.keyFeaturesContent;
  }
 
 
  getFaqData(): Record<string, FaqItem[]> {
    return this.faqData;
  }
 
  /**
   * Returns FAQ items for a specific category
   * @param category - The category of FAQs to retrieve
   */
  getFaqCategory(category: string): FaqItem[] {
    return this.faqData[category] || [];
  }
 
  /**
   * Returns all available FAQ categories
   */
  getFaqCategories(): string[] {
    return Object.keys(this.faqData);
  }
}
 