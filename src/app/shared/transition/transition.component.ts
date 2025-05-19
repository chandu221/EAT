import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [],
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.css'
})
export class TransitionComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // After the animation plays (adjust timing as needed)
    setTimeout(() => {
      this.router.navigate(['/rsu']);
    }, 3000); // 3 seconds for the GIF to play
  }
}
