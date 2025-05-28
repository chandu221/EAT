import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface AssistantRequest { message: string; }
export interface AssistantResponse { reply: string; }
 
@Injectable({ providedIn: 'root' })
export class AssistantService {
private apiUrl = 'http://localhost:5010/api/Assistant/ask';


  constructor(private http: HttpClient) {}
  ask(msg: string): Observable<AssistantResponse> {
return this.http.post<AssistantResponse>(this.apiUrl, { message: msg });
  }
}