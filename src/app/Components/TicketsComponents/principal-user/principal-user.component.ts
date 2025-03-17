import { Component, OnInit } from '@angular/core';
import { Tickets } from '../../../Interfaces/tickets/tickets';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-principal-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal-user.component.html',
  styleUrl: './principal-user.component.scss'
})
export class PrincipalUserComponent implements OnInit {
  listTickets!: Tickets[];
  firstData?: Tickets[];
  listIdModal?: Tickets;

  constructor(private ticketsService: TicketsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listTicketsUserAll();
    this.listTicketsUserFilter();
    this.ControlHeader();
  }

  listTicketsUserAll(){
    this.ticketsService.listTickets().subscribe(tickets => {
      this.listTickets = tickets;
    })
  }

  listTicketsUserFilter(){
    this.ticketsService.listTickets().subscribe(tickets => {
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
      this.dialog.open(templateRef, {
        width: '95%',
        height: '95%',
        data: {listIdModal: this.listIdModal}
      });
    });
  }
}
