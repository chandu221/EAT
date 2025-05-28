import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface TrendResponse {
  trend: string;
}
 
@Injectable({
  providedIn: 'root',
})
export class TrendService {
private apiUrl = 'https://localhost:5010/api/trend'; // Update to your backend URL
 
  constructor(private http: HttpClient) {}
 
  getTrend(prices: number[]): Observable<TrendResponse> {
return this.http.post<TrendResponse>(this.apiUrl, { prices });
  }
}