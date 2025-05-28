import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Anomoly{
  symbol: string;
  checkedAt: string;
  grantPrice: number;
  currentPrice: number;
  deviationPercentage: number;
  isAnomaly: boolean; 
    
  
}
@Injectable({
  providedIn: 'root'
})
export class AnomalyService {
private baseUrl='http://localhost:5010/api/Anomaly';

  constructor(private http:HttpClient) { }
  // checkAnomoly(symbol: string, grantPrice: number): Observable<Anomoly> {
  //   const params = new HttpParams()
  //     .set('symbol', symbol)
  //     .set('grantPrice', grantPrice.toString());

  //   return this.http.get<Anomoly>(this.baseUrl, { params });
  // }
  // checkAnomaly(empId: string, symbol: string, grantPrice: number): Observable<Anomoly> {
  //   const url = `${this.baseUrl}/check/${empId}/${symbol}/${grantPrice}`;
  //   return this.http.get<Anomoly>(url);
  // }
  checkAnomaly(empId: string, symbol: string, grantPrice: number): Observable<Anomoly> {
    const url = `http://localhost:5010/api/Anomaly/check/${empId}/${symbol}/${grantPrice}`;
    return this.http.get<Anomoly>(url);
  }
  
}
