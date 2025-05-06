import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquityService {
  private apiUrlRsu='http://localhost:5010/api/Rsu/';
  private apiUrlEsop='http://localhost:5010/api/Esop/';
  private apiUrlVest='http://localhost:5001/api/Vesting/schedule/';
  constructor(private http:HttpClient) { }
  
  getRsuData(empId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrlRsu}${empId}`);
  }
  
  getEsopData (empId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrlEsop}${empId}`);
  }
  getVestData(empId:string, symbol:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrlVest}${empId}/${symbol}`);
  }
  downloadPdf(fileName: string): void {
    const link = document.createElement('a');
    link.href = `assets/documents/${fileName}.pdf`;
    link.download = `assets/documents/${fileName}.pdf`;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  getLogoPath(): string {
    return 'assets/images/logo.svg'; // Centralized image path
  }

  
}
 