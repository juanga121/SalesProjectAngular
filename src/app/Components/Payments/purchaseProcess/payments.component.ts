import { Component, inject, OnInit } from '@angular/core';
import { Payment, PurchaseStatus } from '../../../Interfaces/payment/payment';
import { PaymentserviceService } from '../../../Services/Paymentservice/paymentservice.service';
import { AuthService } from '../../../Services/authservices/auth.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
    });
  }

  UpdatePaymentStatus(payment: Payment) {
    const idPayment = this.payment.id!;

    const updatedPayment: Payment = {
      paymentsId: payment.paymentsId,
      paymentsUsersId: payment.paymentsUsersId,
      totalToPay: payment.totalToPay,
      quantityHistory: payment.quantityHistory,
      purchaseStatus: PurchaseStatus.Aprobado
    }

    this.paymentService.ChangeStatus(idPayment, updatedPayment).subscribe({
      next: () => {
        Swal.fire('Proceso de compra realizado', 'Gracias por tu compra' , 'success');
        this.router.navigate(['PrincipalTickets/ListPayments']);
      },
      error: (error) => {
        console.error('Error updating payment status:', error);
      }
    });
  }
}
