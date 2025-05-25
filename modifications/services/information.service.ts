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

//glossary terms interface
export interface GlossaryTerm {
  name: string;
  definition: string;
  relatedTerms?: string[];
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

   getGlossaryTerms(): GlossaryTerm[] {
    return [
      {
        name: "Award Agreement",
        definition: "A legal document that outlines the terms and conditions of an equity compensation grant, including vesting schedule, exercise price, and expiration date.",
        relatedTerms: ["Grant Date", "Vesting Schedule"]
      },
      {
        name: "Award Price",
        definition: "The price at which stock options or other equity awards are granted to employees, typically the fair market value of the stock on the grant date.",
        relatedTerms: ["Fair Market Value", "Grant Date"]
      },
      {
        name: "Blackout Period",
        definition: "A period during which employees are restricted from trading company stock, often occurring around earnings announcements or significant corporate events.",
        relatedTerms: ["Trading Window", "Insider Trading"]
      },
      {
        name: "Cliff Vesting",
        definition: "A vesting schedule where no equity vests until a specific date, at which point a large portion vests all at once, followed by incremental vesting thereafter.",
        relatedTerms: ["Vesting Schedule", "Graded Vesting"]
      },
      {
        name: "Dilution",
        definition: "The reduction in ownership percentage of existing shareholders that occurs when a company issues new shares.",
        relatedTerms: ["Fully Diluted Shares Outstanding"]
      },
      {
        name: "Discounted Price",
        definition: "A reduced price at which employees can purchase company stock, typically offered in Employee Stock Purchase Plans (ESPPs).",
        relatedTerms: ["ESOP", "Fair Market Value"]
      },
      {
        name: "Earnings Per Share (EPS)",
        definition: "A company's profit divided by the outstanding shares of its common stock, often used as an indicator of a company's profitability.",
        relatedTerms: ["Stock Price", "Dividends"]
      },
      {
        name: "Employee Stock Ownership Plan (ESOP)",
        definition: "A qualified retirement plan that invests primarily in the employer's stock, providing employees with an ownership interest in the company.",
        relatedTerms: ["Restricted Stock Units", "Stock Options"]
      },
      {
        name: "Exercise",
        definition: "The act of purchasing shares of stock at the predetermined price specified in a stock option agreement.",
        relatedTerms: ["Exercise Price", "Cashless Exercise"]
      },
      {
        name: "Exercise Price",
        definition: "The price at which the holder of a stock option can purchase the underlying stock, also known as the strike price.",
        relatedTerms: ["Fair Market Value", "In-the-Money"]
      },
      {
        name: "Exercisable Shares",
        definition: "Stock options that have vested and are available to be exercised by the option holder.",
        relatedTerms: ["Vested Shares", "Exercise"]
      },
      {
        name: "Expiration Date",
        definition: "The date after which a stock option can no longer be exercised and becomes worthless.",
        relatedTerms: ["Term", "Exercise"]
      },
      {
        name: "Fair Market Value (FMV)",
        definition: "The current market price of a company's stock, used to determine the exercise price of stock options and for tax purposes.",
        relatedTerms: ["Exercise Price", "Valuation"]
      },
      {
        name: "Final Exercise Date",
        definition: "The last date on which a stock option can be exercised before it expires.",
        relatedTerms: ["Expiration Date", "Exercise"]
      },
      {
        name: "Grant",
        definition: "The issuance of stock options, restricted stock units, or other equity compensation to an employee or service provider.",
        relatedTerms: ["Grant Date", "Award Agreement"]
      },
      {
        name: "Grant Date",
        definition: "The date on which equity compensation is awarded to an employee, establishing the exercise price and vesting schedule.",
        relatedTerms: ["Award Agreement", "Exercise Price"]
      },
      {
        name: "Graded Vesting",
        definition: "A vesting schedule where equity vests in installments over time, such as monthly or annually, as opposed to cliff vesting.",
        relatedTerms: ["Vesting Schedule", "Cliff Vesting"]
      },
      {
        name: "In-the-Money",
        definition: "A stock option where the current market price of the stock exceeds the option's exercise price, making the option valuable.",
        relatedTerms: ["Out-of-the-Money", "Exercise Price"]
      },
      {
        name: "Incentive Stock Option (ISO)",
        definition: "A type of employee stock option that offers tax advantages if certain conditions are met, available only to employees.",
        relatedTerms: ["Non-Qualified Stock Option", "Tax Treatment"]
      },
      {
        name: "Insider Trading",
        definition: "The illegal practice of trading a company's securities based on material, non-public information about the company.",
        relatedTerms: ["Blackout Period", "SEC Regulations"]
      },
      {
        name: "Liquidity Event",
        definition: "A transaction, such as an IPO, acquisition, or merger, that allows shareholders to convert their equity into cash.",
        relatedTerms: ["Exit Strategy", "IPO"]
      },
      {
        name: "Market Value",
        definition: "The current worth of company shares based on the most recent trading price in public markets.",
        relatedTerms: ["Fair Market Value", "Stock Price"]
      },
      {
        name: "Non-Qualified Stock Option (NSO/NQSO)",
        definition: "A type of stock option that doesn't qualify for special tax treatment under the Internal Revenue Code, available to employees, directors, consultants, and advisors.",
        relatedTerms: ["Incentive Stock Option", "Tax Treatment"]
      },
      {
        name: "Option Pool",
        definition: "A portion of a company's shares reserved for future issuance to employees and other service providers.",
        relatedTerms: ["Dilution", "Equity Plan"]
      },
      {
        name: "Out-of-the-Money",
        definition: "A stock option where the current market price of the stock is below the option's exercise price, making the option currently valueless.",
        relatedTerms: ["In-the-Money", "Exercise Price"]
      },
      {
        name: "Performance-Based Vesting",
        definition: "A vesting schedule where equity vests upon achievement of specific company or individual performance goals.",
        relatedTerms: ["Time-Based Vesting", "Vesting Schedule"]
      },
      {
        name: "Post-Termination Exercise Period",
        definition: "The timeframe after employment ends during which an employee can exercise vested stock options.",
        relatedTerms: ["Vested Options", "Expiration Date"]
      },
      {
        name: "Restricted Stock",
        definition: "Shares granted to employees that cannot be sold until certain conditions are met, typically time-based vesting requirements.",
        relatedTerms: ["Restricted Stock Units", "Vesting"]
      },
      {
        name: "Restricted Stock Unit (RSU)",
        definition: "A promise to issue shares of company stock once vesting conditions are satisfied, without the need to purchase the shares.",
        relatedTerms: ["Restricted Stock", "Stock Options"]
      },
      {
        name: "Reverse Vesting",
        definition: "A mechanism where founders or early employees receive all their shares upfront, but the company has the right to repurchase unvested shares if they leave.",
        relatedTerms: ["Founder Equity", "Vesting"]
      },
      {
        name: "Securities and Exchange Commission (SEC)",
        definition: "The U.S. government agency responsible for enforcing securities laws and regulating the securities industry.",
        relatedTerms: ["Insider Trading", "Rule 10b5-1 Plan"]
      },
      {
        name: "Stock Appreciation Rights (SARs)",
        definition: "A form of compensation that gives employees the right to receive the appreciation in value of company stock over a specified period.",
        relatedTerms: ["Phantom Stock", "Stock Options"]
      },
      {
        name: "Strike Price",
        definition: "The predetermined price at which a stock option holder can purchase the underlying stock, also known as the exercise price.",
        relatedTerms: ["Exercise Price", "Fair Market Value"]
      },
      {
        name: "Tax Treatment",
        definition: "The way equity compensation is taxed, varying based on the type of equity (RSUs, ISOs, NSOs) and relevant tax laws.",
        relatedTerms: ["Incentive Stock Option", "Non-Qualified Stock Option"]
      },
      {
        name: "Time-Based Vesting",
        definition: "A vesting schedule where equity vests based on the passage of time rather than performance metrics.",
        relatedTerms: ["Performance-Based Vesting", "Vesting Schedule"]
      },
      {
        name: "Trading Window",
        definition: "Designated periods when employees are permitted to trade company stock, typically after earnings announcements when material information has been publicly disclosed.",
        relatedTerms: ["Blackout Period", "Insider Trading"]
      },
      {
        name: "Unvested Shares",
        definition: "Shares or options that have been granted but have not yet satisfied the vesting requirements and therefore cannot be sold or exercised.",
        relatedTerms: ["Vested Shares", "Vesting Schedule"]
      },
      {
        name: "Valuation",
        definition: "The process of determining the economic value of a company, which affects the price of equity compensation awards.",
        relatedTerms: ["Fair Market Value", "409A Valuation"]
      },
      {
        name: "Vested Shares",
        definition: "Shares or options that have satisfied all vesting requirements and are now fully owned by the employee or can be exercised.",
        relatedTerms: ["Unvested Shares", "Vesting Schedule"]
      },
      {
        name: "Vesting",
        definition: "The process by which an employee earns the right to exercise stock options or receive full ownership of restricted stock over time.",
        relatedTerms: ["Vesting Schedule", "Cliff Vesting"]
      },
      {
        name: "Vesting Schedule",
        definition: "The timeline that determines when and how employees gain full ownership rights to their equity compensation.",
        relatedTerms: ["Cliff Vesting", "Graded Vesting"]
      },
      {
        name: "409A Valuation",
        definition: "An independent assessment of a private company's fair market value, used to set the exercise price of stock options to avoid tax penalties.",
        relatedTerms: ["Fair Market Value", "Exercise Price"]
      }
    ];
  }

  getTaxInformation() {
    return [
      {
        title: "Overview of Equity Award Taxation",
        description: "Equity awards like stock options and RSUs have specific tax implications that vary based on award type, vesting schedule, and when you choose to exercise or sell.",
        disclaimer: "The information provided is for general guidance only and is not intended as tax advice. Please consult with a tax professional regarding your specific situation."
      },
      {
        title: "Stock Options - Tax Considerations",
        description: "The taxation of stock options depends on whether they're Incentive Stock Options (ISOs) or Non-qualified Stock Options (NSOs).",
        bulletPoints: [
          "ISOs may qualify for special tax treatment if certain holding periods are met",
          "NSOs are taxed as ordinary income at exercise based on the spread between strike price and fair market value",
          "Capital gains tax applies when you sell shares, with rates depending on holding period"
        ],
        table: {
          headers: ["Option Type", "Tax at Grant", "Tax at Exercise", "Tax at Sale"],
          rows: [
            ["Incentive Stock Options (ISOs)", "None", "Potential Alternative Minimum Tax (AMT)", "Long-term capital gains if held for qualifying period"],
            ["Non-qualified Stock Options (NSOs)", "None", "Ordinary income tax on spread", "Capital gains tax based on holding period"]
          ]
        }
      },
      {
        title: "Restricted Stock Units (RSUs) - Tax Implications",
        description: "RSUs are typically taxed as ordinary income when they vest, based on the fair market value of the shares on the vesting date.",
        bulletPoints: [
          "Taxable as ordinary income at vesting",
          "Withholding is typically required at vesting",
          "Additional capital gains tax applies when you sell shares, based on the holding period"
        ]
      },
      {
        title: "Employee Stock Purchase Plans (ESPPs)",
        description: "ESPPs allow employees to purchase company stock, often at a discount. Tax treatment depends on whether the plan is qualified or non-qualified.",
        bulletPoints: [
          "Qualified plans may receive favorable tax treatment",
          "Discount may be taxed as ordinary income",
          "Additional capital gains taxes apply when you sell shares"
        ]
      },
      {
        title: "Tax Reporting Documents",
        description: "Your employer will provide specific tax forms related to your equity awards:",
        bulletPoints: [
          "Form W-2: Reports income from RSUs and NSOs at exercise",
          "Form 3921: Reports ISO exercises",
          "Form 3922: Reports ESPP purchases",
          "Form 1099-B: Reports stock sales (typically from your broker)"
        ]
      },
      {
        title: "Tax Planning Strategies",
        description: "Consider these strategies when planning for taxes related to your equity awards:",
        bulletPoints: [
          "Coordinate exercises and sales with your overall tax situation",
          "Consider tax-loss harvesting to offset gains",
          "Plan for potential AMT with ISO exercises",
          "Calculate estimated taxes to avoid underpayment penalties",
          "Consider the impact of vesting events on your tax bracket"
        ]
      }
    ];
  }
  
  getLegalNotices() {
    return [
      {
        title: "Terms of Service",
        content: "Welcome to EquiHub. By accessing or using our services, you agree to be bound by these Terms of Service.",
        lastUpdated: "May 1, 2025",
        subSections: [
          {
            title: "Acceptance of Terms",
            content: "By accessing or using the EquiHub platform and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services."
          },
          {
            title: "Description of Service",
            content: "EquiHub provides tools for tracking, managing, and analyzing equity awards. We provide these services subject to these Terms of Service."
          },
          {
            title: "User Accounts",
            content: "To access certain features of EquiHub, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
            bulletPoints: [
              "You must provide accurate and complete information when creating your account",
              "You are responsible for safeguarding your password",
              "You must notify us immediately of any unauthorized use of your account",
              "We reserve the right to disable your account at our discretion"
            ]
          },
          {
            title: "Permitted Use and Restrictions",
            content: "EquiHub grants you a limited, non-exclusive, non-transferable license to use our services for your personal or business purposes. You may not:",
            bulletPoints: [
              "Use the services for any illegal purpose or in violation of any laws",
              "Sell, resell, license, sublicense, or distribute the services",
              "Copy, modify, adapt, or create derivative works based on the services",
              "Reverse engineer, decompile, or disassemble the software used to provide the services",
              "Use data mining, robots, or similar data gathering methods",
              "Interfere with or disrupt the integrity or performance of the services"
            ]
          },
          {
            title: "Intellectual Property Rights",
            content: "All rights, title, and interest in and to the EquiHub services, including all intellectual property rights, are and will remain the exclusive property of EquiHub and its licensors. Nothing in these Terms should be construed as transferring any aspects of such rights to you or any third party."
          }
        ]
      },
      {
        title: "Privacy Policy",
        content: "EquiHub is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you.",
        subSections: [
          {
            title: "Information We Collect",
            content: "We collect information when you register for an account, use our services, or communicate with us. This information may include:",
            bulletPoints: [
              "Personal information such as name, email address, and phone number",
              "Account information including login credentials",
              "Financial information related to your equity awards",
              "Usage data such as how you interact with our services",
              "Device information including browser type, IP address, and operating system"
            ]
          },
          {
            title: "How We Use Your Information",
            content: "We use the information we collect to:",
            bulletPoints: [
              "Provide, maintain, and improve our services",
              "Process and complete transactions",
              "Send you technical notices and support messages",
              "Respond to your comments and questions",
              "Protect against fraudulent or illegal activity",
              "Understand how users interact with our services",
              "Develop new products and services"
            ]
          },
          {
            title: "Information Sharing and Disclosure",
            content: "We do not sell your personal information. We may share information in the following situations:",
            bulletPoints: [
              "With your consent",
              "With service providers who perform services on our behalf",
              "To comply with laws, regulations, or legal processes",
              "In connection with a merger, sale, or acquisition of all or part of our company",
              "To protect the rights, property, or safety of EquiHub, our users, or others"
            ]
          },
          {
            title: "Data Security",
            content: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security."
          }
        ]
      },
      {
        title: "Disclaimer of Warranties",
        content: "THE EQUIHUB SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
        subSections: [
          {
            title: "No Investment Advice",
            content: "EquiHub does not provide investment, financial, tax, or legal advice. The information provided through our services is for informational and educational purposes only. You should consult with qualified professionals regarding your specific situation."
          },
          {
            title: "Accuracy of Information",
            content: "While we strive to provide accurate information, we cannot guarantee that all information displayed is accurate, complete, or current. You should verify all information before relying on it, and all decisions based on information provided by EquiHub are your sole responsibility."
          },
          {
            title: "System Availability",
            content: "We do not guarantee that our services will be available at all times or that they will be uninterrupted or error-free. We may occasionally experience issues due to maintenance, updates, or factors beyond our control."
          }
        ]
      },
      {
        title: "Limitation of Liability",
        content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, EQUIHUB AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE USE OF THE SERVICES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF EQUIHUB HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        subSections: [
          {
            title: "Cap on Liability",
            content: "In no event shall EquiHub's total liability to you for all damages exceed the amount paid by you, if any, for accessing or using our services during the twelve (12) months immediately preceding the event giving rise to the liability."
          }
        ]
      },
      {
        title: "Governing Law",
        content: "These Terms of Service and any dispute arising out of or related to these terms or the services shall be governed by and construed in accordance with the laws of the state of Delaware, without giving effect to any principles of conflicts of law.",
        subSections: [
          {
            title: "Dispute Resolution",
            content: "Any dispute arising from these Terms of Service shall first be addressed through informal negotiations. If the dispute cannot be resolved through informal negotiations, it shall be resolved through binding arbitration conducted in accordance with the rules of the American Arbitration Association."
          }
        ]
      }
    ];
  }

 
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
 