// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
 
// import { FormsModule } from '@angular/forms'; // For ngModel
// import { HttpClientModule } from '@angular/common/http'; // For HTTP calls
 
// import { AppComponent } from './app.component';
// import { TrendComponent } from '../../trend/trend.component';
// // Ensure you import your TrendComponent from the correct path

// ; // Import your new component
 
// @NgModule({
//   declarations: [
//     AppComponent,
//     TrendComponent  // Declare it here
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     HttpClientModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
import { AppComponent } from './app.component';
//import { RsuComponent } from '../dashboard/MainDashboardComponent/rsu/rsu.component';
//import { EsopComponent } from '../dashboard/MainDashboardComponent/esop/esop.component';
//import { VestComponent } from '../dashboard/MainDashboardComponent/vest/vest.component';
// import { TrendComponent } from './dashboard/main-dashboard/components/trend/trend.component';
import { AssistantComponent } from './assistant/assistant.component';
//import { AppRoutingModule } from './app-routing.module';
 
@NgModule({
  declarations: [
    AppComponent,
    AssistantComponent,
    // TrendComponent,    // ← make sure this is here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // ← and this
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }