import { Component, inject, OnInit } from '@angular/core';
import { Payment } from '../../Interfaces/payment/payment';
import { PaymentserviceService } from '../../Services/Paymentservice/paymentservice.service';
import { AuthService } from '../../Services/authservices/auth.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  payment!: Payment;

  paymentService = inject(PaymentserviceService);
  authService = inject(AuthService);
  router = inject(Router);
  
  ngOnInit(): void {
    this.GetPaymentById(this.authService.getUserId()!);
  }

  GetPaymentById(id: string) {
    this.paymentService.GetPurchaseById(id).subscribe( tickets => {
      this.payment = tickets;
    })
  }
}
