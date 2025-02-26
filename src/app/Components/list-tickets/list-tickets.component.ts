import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Tickets } from '../../Interfaces/tickets/tickets';
import { TicketsService } from '../../Services/tickets/tickets.service';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent implements OnInit {
  listTickets?: Tickets[];

  constructor(
    private serviceTickets: TicketsService,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.serviceTickets.listTickets().subscribe(tickets => {
      this.listTickets = tickets;
    });
  }
}
