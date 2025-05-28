import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { state } from "@angular/animations";
import { ToastrService } from "ngx-toastr";

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

  loginError = "";
  emailError = "";
  passwordError = "";
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  showToast() {
    console.log("Login successful_____");
    this.toastr.success("Login Successful", "Success", {
      timeOut: 3000,
      positionClass: "toast-top-right",
      closeButton: true,
    });
  }
  validateForm(): boolean {
    this.isSubmitted = true;
    let isValid = true;

    // Reset error messages
    this.emailError = "";
    this.passwordError = "";

    // Email validation
    if (!this.email) {
      this.emailError = "Email is required";
      isValid = false;
    } else if (!this.validateEmail(this.email)) {
      this.emailError = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!this.password) {
      this.passwordError = "Password is required";
      isValid = false;
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.loginError = "";

    this.authService
      .login(this.email, this.password, this.rememberMe)
      .subscribe({
        next: () => {
          this.showToast(), this.router.navigate(["/rsu"]);
        },
        error: (err) => {
          console.error("Login failed", err);
          this.loginError = "Incorrect email or password";
        },
      });
  }
  FG() {
    alert("Coming Soon");
  }
}
