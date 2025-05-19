import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$=this.userSubject.asObservable();
  private http = inject(HttpClient);
  private router = inject(Router);
  private autoLogoutTimer: any;

  private emp_id='EMPID';
  private tokenKey = "EAT";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getStorage(): Storage | null {
    if (!this.isBrowser()) {
      return null;
    }
    if (localStorage.getItem(this.tokenKey)) {
      return localStorage;
    } else {
      return sessionStorage;
    }
  }

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http
      .post<{ token: string,user:any}>("http://localhost:5010/api/Auth/Auth", {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (!this.isBrowser()) {
            return;
          }
          if (!rememberMe) {
            const token = localStorage.setItem(this.tokenKey, res.token);
            const user = localStorage.setItem(this.emp_id,res.user.emp_id)
            localStorage.setItem('user',JSON.stringify(res.user));
          } else {
            sessionStorage.setItem(this.tokenKey, res.token);
            sessionStorage.setItem(this.emp_id, res.user.emp_id);
            sessionStorage.setItem('user',JSON.stringify(res.user));


          }
          this.isLoggedIn$.next(true);
          // this.router.navigate(["/dashbaord"]);
          //console.log("Login successful", res.token);
          console.log("check for id",res.user.emp_id);
        })
      );
      
  }

  scheduleAutoLogout() {
    if (!this.isBrowser()) return;
    const expiryTimeString =
      localStorage.getItem("token-expiry") ||
      sessionStorage.getItem("token-expiry");

    if (!expiryTimeString) return;

    const expiryTime = +expiryTimeString;
    const currentTime = new Date().getTime();
    const timeLeft = expiryTime - currentTime;

    if (timeLeft > 0) {
      this.autoLogoutTimer = setTimeout(() => {
        this.logout();
      }, timeLeft);
    } else {
      this.logout();
    }
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.emp_id);
      sessionStorage.removeItem(this.emp_id);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      localStorage.removeItem("token-expiry");
      sessionStorage.removeItem("token-expiry");
    }
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.isLoggedIn$.next(false);
    this.router.navigate(["/"]);
  }
  isLoggedIn(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    return (
      !!localStorage.getItem(this.tokenKey) ||
      !!sessionStorage.getItem(this.tokenKey)
    );
  }

  getToken() {
    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }
  getEmpId(){
    if (!this.isBrowser()) {
      return null;
    }
 
    return localStorage.getItem(this.emp_id);
  }
  private hasToken(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    return !!localStorage.getItem(this.tokenKey);
  }
  
  


  // ngOnInit() {
  //   this.authService.scheduleAutoLogout();
  // }
}
