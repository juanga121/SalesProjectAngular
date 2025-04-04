import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/authservices/auth.service';
import { PaymentserviceService } from '../../../Services/Paymentservice/paymentservice.service';
import { Router } from '@angular/router';
import { PaymentHistory } from '../../../Interfaces/payment/payment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listpayments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listpayments.component.html',
  styleUrl: './listpayments.component.scss'
})
export class ListpaymentsComponent implements OnInit {
  payment!: PaymentHistory[];

  servicePayment = inject(PaymentserviceService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.GetByUserId(this.authService.getUserId()!);
  }

  GetByUserId(id: string) {
    this.servicePayment.GetPaymentsByIdUsers(id).subscribe( tickets => {
      this.payment = tickets;
    });
  }
}
