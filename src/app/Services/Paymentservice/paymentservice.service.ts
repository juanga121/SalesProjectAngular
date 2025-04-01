import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../Interfaces/payment/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  AddPaymentProcess(payment: Payment): Observable<Payment>{
    return this.http.post<Payment>(this.apiUrl + '/api/PaymentsProcess/AddRetention', payment);
  }

  GetPurchaseById(id: string): Observable<Payment>{
    return this.http.get<Payment>(this.apiUrl + '/api/PaymentsProcess/' + id);
  }

  ChangeStatus(id: string, payment: Payment): Observable<Payment>{
    return this.http.put<Payment>(this.apiUrl + '/api/PaymentsProcess/' + id, payment);
  }
}
