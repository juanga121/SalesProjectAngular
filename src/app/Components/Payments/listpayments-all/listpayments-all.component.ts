import { Component, OnInit } from '@angular/core';
import { PaymentHistory } from '../../../Interfaces/payment/payment';
import { PaymentserviceService } from '../../../Services/Paymentservice/paymentservice.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listpayments-all',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listpayments-all.component.html',
  styleUrl: './listpayments-all.component.scss'
})
export class ListpaymentsAllComponent implements OnInit {
  listPayments!: PaymentHistory[];
  
  constructor(private paymentService: PaymentserviceService) {}

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentService.GetAllPayments().subscribe( payments => {
      this.listPayments = payments;
    });
  }
}
