import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../Interfaces/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  AddPaymentProcess(payment: Payment){
    return this.http.post<Payment>(this.apiUrl + '/api/PaymentsProcess/AddRetention', payment);
  }
}
