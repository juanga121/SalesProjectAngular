import { Component, OnInit } from '@angular/core';
import { Tickets } from '../../../Interfaces/tickets/tickets';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

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

  InitialCount = 1;

  initialPrice? : number;

  constructor(private ticketsService: TicketsService, private dialog: MatDialog) { }

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
}
