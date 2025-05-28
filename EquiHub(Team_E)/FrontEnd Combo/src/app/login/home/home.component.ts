import { Component } from '@angular/core';
import { LoginInfoComponent } from "../components/login-info/login-info.component";
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from "../components/footer/footer.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginInfoComponent, LoginFormComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  WelMsg="Welcome to your Equity Award Tracker";
}
