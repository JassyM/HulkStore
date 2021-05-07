import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  async getPurchase(): Promise<Purchase[]> {
    const headers = this.setHeader();
    return await this.http.get<Purchase[]>(`${environment.purchases}`, { headers }).toPromise();
  }

  createPurchase(params): Observable<any> {
    const headers = this.setHeader();
    return this.http.post(`${environment.purchase}`, params, { headers });
  }
}
