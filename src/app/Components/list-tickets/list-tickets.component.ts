import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tickets } from '../../Interfaces/tickets/tickets';
import { TicketsService } from '../../Services/tickets/tickets.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent implements OnInit {
  listTickets?: Tickets[];

  constructor(
    private serviceTickets: TicketsService,
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(){
    this.serviceTickets.listTickets().subscribe(tickets => {
      this.listTickets = tickets;
    });
  }
}
