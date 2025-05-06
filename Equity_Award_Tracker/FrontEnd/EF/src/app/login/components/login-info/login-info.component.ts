import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-info',
  standalone: true,
  imports: [],
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.css',
})
export class LoginInfoComponent {
  @Input() msg: String = '';
}
