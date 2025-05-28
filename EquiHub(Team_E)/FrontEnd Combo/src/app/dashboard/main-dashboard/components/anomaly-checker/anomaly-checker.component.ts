import { Component } from '@angular/core';
import { AnomalyService,Anomoly } from '../../services/anomaly.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anomaly-checker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anomaly-checker.component.html',
  styleUrl: './anomaly-checker.component.css'
})
export class AnomalyCheckerComponent {
symbol:string='';
grantPrice!:number;
result?:Anomoly;
error?:string;
loading=false;
constructor(private anomalyService:AnomalyService){}

checkAnomaly(){
  this.error=undefined;
  this.result=undefined;
  if(!this.symbol||!this.grantPrice){
    this.error='Please enter both symbol and grant price';
    return;
  }
  this.loading=true;
  const empId = '11223';
  this.anomalyService.checkAnomaly(empId, this.symbol.trim(), this.grantPrice).subscribe({
    next: (res: any) => {
      this.result = res;
      this.loading = false;
    },
    error:()=>{
      this.error='Error fetchinganomaly data.Please check the input .';
      this.loading=false;
    }
  });

}
}
