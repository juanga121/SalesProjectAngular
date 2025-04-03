import { Component, inject, OnInit } from '@angular/core';
import { Tickets } from '../../../Interfaces/tickets/tickets';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PaymentserviceService } from '../../../Services/Paymentservice/paymentservice.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/authservices/auth.service';
import { ErrorService } from '../../../Services/ErrorControl/error.service';

@Component({
  selector: 'app-principal-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal-user.component.html',
  styleUrl: './principal-user.component.scss'
})
export class PrincipalUserComponent implements OnInit {
  listTickets!: Tickets[];
  firstData!: Tickets[];
  listIdModal?: Tickets;

  paymentService = inject(PaymentserviceService);
  authService = inject(AuthService);
  router = inject(Router);
  serviceErrors = inject(ErrorService);

  InitialCount = 1;

  initialPrice? : number;

  constructor(private ticketsService: TicketsService,
    private dialog: MatDialog,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listTicketsUserAll();
    this.listTicketsUserFilter();
    this.ControlHeader();
    this.Carousel();
  }

  listTicketsUserAll(){
    this.ticketsService.listTickets().subscribe(tickets => {
      this.listTickets = tickets;
    });
  }

  listTicketsUserFilter(){
    this.ticketsService.listRecentlyAddedTickets().subscribe(tickets => {
      this.firstData = tickets;
    })
  }

  ControlHeader(){
    window.addEventListener('scroll', () => {
      const contHeader = document.querySelector('#cont_header');
      contHeader!.classList.toggle('bajo', window.scrollY > 0);
    });
  }

  openDialog(templateRef: any, ticketsId: string) {
    this.ticketsService.getTicketsById(ticketsId).subscribe(tickets => {
      this.listIdModal = tickets;
      this.initialPrice = this.listIdModal?.price;

      const innerWidth = window.innerWidth;

      let screeWith = '80%';
      let screenHeight = '500px';

      if (innerWidth < 840){
        screeWith = '95%';
      }else if (innerWidth >= 840){
        screeWith = '70%';
      }

      this.dialog.open(templateRef, {
        width: screeWith,
        height: screenHeight,
        data: {listIdModal: this.listIdModal}
      });
    });
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  Increment(){
    this.InitialCount++;
  }

  Decrement(){
    if (this.InitialCount > 1){
      this.InitialCount--;
    }
  }

  TotalPrice(): number{
    var total = this.InitialCount * this.initialPrice!;
    return total;
  }

  Carousel(){
    const carousel = document.querySelector('#cont_data');
    const btoRight = document.querySelector('#bto_carru');
    const btoLeft = document.querySelector('#bto_carru_left');

    function removeBotons(){
      btoLeft?.classList.remove('remove');
      btoRight?.classList.remove('remove');

      if (carousel){
        if (carousel.scrollWidth <= carousel.clientWidth){
          btoRight?.classList.add('remove');
          btoLeft?.classList.add('remove');
        }else{
          if (carousel.scrollLeft === 0){
            btoLeft?.classList.add('remove');
          }else{
            btoLeft?.classList.remove('remove');
          }

          if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth){
            btoRight?.classList.add('remove');
          }else{
            btoRight?.classList.remove('remove');
          }
        }
      }
    }

    setTimeout(removeBotons, 1000);
    removeBotons();

    btoRight?.addEventListener('click', () => {
      carousel!.scrollBy({
        left: carousel!.clientWidth,
        behavior: 'smooth'
      });
    });

    btoLeft?.addEventListener('click', () => {
      carousel!.scrollBy({
        left: -carousel!.clientWidth,
        behavior: 'smooth'
      });
    });

    carousel?.addEventListener('scroll', removeBotons);
  }

  errors: { [key: string]: string[] } = {};

  AddPayment(){
    const payments = {
      paymentsId: this.listIdModal?.id!,
      paymentsUsersId: this.authService.getUserId()!,
      quantityHistory: this.InitialCount,
    };

    console.log(payments);

    this.paymentService.AddPaymentProcess(payments).subscribe({
      next: (response: any) => {
        this.dialog.closeAll();
        this.router.navigate(['/PrincipalTickets/PaymentsProcess']);
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.errors = this.serviceErrors.groupErrorsByProperty(error);
        } else {
          Swal.fire('Error', error, 'error');
        }
      }
    })
  }
}
