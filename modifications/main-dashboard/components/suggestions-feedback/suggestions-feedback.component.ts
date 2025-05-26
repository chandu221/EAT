import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suggestions-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './suggestions-feedback.component.html',
  styleUrls: ['./suggestions-feedback.component.scss']
})
export class SuggestionsFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  submitted = false;
  success = false;
  
  feedbackCategories = [
    'Feature Suggestion',
    'User Interface',
    'User Experience',
    'Performance',
    'Bug Report',
    'General Feedback',
    'Other'
  ];

  constructor(private fb: FormBuilder) { 
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(20)]],
      attachScreenshot: [false],
      permission: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }
  
  // Convenience getter for easy access to form fields
  get f() { return this.feedbackForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted successfully!', this.feedbackForm.value);
    
    // Show success message and reset form
    this.success = true;
    setTimeout(() => {
      this.success = false;
      this.submitted = false;
      this.feedbackForm.reset();
      // Set default values
      this.feedbackForm.patchValue({
        category: '',
        attachScreenshot: false,
        permission: false
      });
    }, 5000);
  }
}