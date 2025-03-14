import { CommonModule} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Tickets } from '../../../Interfaces/tickets/tickets';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent implements OnInit{
  listTickets?: Tickets[];
  router = inject(Router);

  constructor(private serviceTickets: TicketsService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(){
    this.serviceTickets.listTickets().subscribe(tickets => {
      this.listTickets = tickets;
    });
  }
  
  deleteTicket(id: string){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceTickets.deleteTicket(id).subscribe(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El ticket ha sido eliminado.",
            icon: "success"
          });
          this.getTickets();
        });
      }
    });
  }
}
