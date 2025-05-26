// glossary.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { InformationService } from '../../services/information.service';
 
@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  terms: any[] = [];
  groupedTerms: { [key: string]: any[] } = {};
  filteredTerms: any[] = [];
  searchTerm: string = '';
  activeLetter: string = 'A';
  showBackToTop: boolean = false;
 
  constructor(private infoService: InformationService) {}
 
  ngOnInit(): void {
    this.terms = this.infoService.getGlossaryTerms();
    this.groupTerms();
    
    // Set initial active letter
    for (const letter of this.alphabet) {
      if (this.hasTermsStartingWith(letter)) {
        this.activeLetter = letter;
        break;
      }
    }
  }
 
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.showBackToTop = scrollPosition > 300;
    
    // Update active letter based on scroll position
    if (!this.searchTerm) {
      for (const letter of this.alphabet) {
        const element = document.getElementById(`section-${letter}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            this.activeLetter = letter;
            break;
          }
        }
      }
    }
  }
 
  groupTerms(): void {
    // Initialize with all letters
    this.alphabet.forEach(letter => {
      this.groupedTerms[letter] = [];
    });
 
    // Group terms by first letter
    this.terms.forEach(term => {
      const firstLetter = term.name.charAt(0).toUpperCase();
      if (this.alphabet.includes(firstLetter)) {
        this.groupedTerms[firstLetter].push(term);
      }
    });
 
    // Sort terms alphabetically within each group
    Object.keys(this.groupedTerms).forEach(key => {
      this.groupedTerms[key].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
 
  filterTerms(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTerms = [];
      return;
    }
 
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTerms = this.terms.filter(term => 
      term.name.toLowerCase().includes(searchTermLower) || 
      term.definition.toLowerCase().includes(searchTermLower)
    );
 
    // Sort filtered results alphabetically
    this.filteredTerms.sort((a, b) => a.name.localeCompare(b.name));
  }
 
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredTerms = [];
  }
 
  scrollToLetter(letter: string): void {
    if (!this.hasTermsStartingWith(letter)) return;
    
    this.activeLetter = letter;
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  scrollToTerm(termName: string): void {
    // Clear search if active
    if (this.searchTerm) {
      this.clearSearch();
      // Allow time for filtered terms to clear before scrolling
      setTimeout(() => {
        this.performScrollToTerm(termName);
      }, 100);
    } else {
      this.performScrollToTerm(termName);
    }
  }
 
  private performScrollToTerm(termName: string): void {
    // Find the term first letter
    const firstLetter = termName.charAt(0).toUpperCase();
    
    // First scroll to letter section
    this.scrollToLetter(firstLetter);
    
    // Then try to find the specific term
    setTimeout(() => {
      const termElements = document.querySelectorAll('.term-title');
      for (let i = 0; i < termElements.length; i++) {
        const element = termElements[i] as HTMLElement;
        if (element.textContent === termName) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Highlight the term briefly
          const termItem = element.closest('.term-item') as HTMLElement;
          if (termItem) {
            termItem.style.transition = 'background-color 0.5s';
            termItem.style.backgroundColor = '#e6f7f8';
            setTimeout(() => {
              termItem.style.backgroundColor = 'white';
            }, 1500);
          }
          
          break;
        }
      }
    }, 500);
  }
 
  hasTermsStartingWith(letter: string): boolean {
    return this.groupedTerms[letter] && this.groupedTerms[letter].length > 0;
  }
 
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
 