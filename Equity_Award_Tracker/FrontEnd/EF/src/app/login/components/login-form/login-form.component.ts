import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { state } from "@angular/animations";

@Component({
  selector: "app-login-form",
  imports: [CommonModule, FormsModule],
  standalone: true,
  // Add the LoginInfoComponent and NavbarComponent to the imports array if they are used in this component
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.css",
})
export class LoginFormComponent {
  email = "";
  password = "";
  rememberMe = false;
  constructor(private authService: AuthService, private router: Router) {
  }
  onSubmit() {
    console.log(this.email, this.password, this.rememberMe);
    // event.preventDefault()
    this.authService
      .login(this.email, this.password, this.rememberMe)
      .subscribe({
        next: (userData) => {
          
          console.log("Login Success",userData);
          this.router.navigate(["/rsu"],{state:{user:userData}});
        },
        error: (err) => console.error("'Login failed',err)"),
        // error: (err) =>  this.router.navigate(["/rsu"]),
      });
  }
  FG() {
    alert("Coming Soon");
  }
}