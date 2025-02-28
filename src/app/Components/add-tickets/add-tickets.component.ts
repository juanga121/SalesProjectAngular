import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../Services/tickets/tickets.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tickets',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-tickets.component.html',
  styleUrl: './add-tickets.component.scss'
})
export class AddTicketsComponent {
  private readonly formBuilder = inject(FormBuilder)
  ticketService = inject(TicketsService)
  router = inject(Router)

  formaDate() {
    const actualDate = new Date();
    const formattedDate = actualDate.toISOString().split('T')[0];
    return formattedDate;
  }

  form = this.formBuilder.group({
    name: [],
    description: [''],
    quantity: [''],
    price: [''],
    event_date: [this.formaDate()],
    event_location: [''],
    event_time: ['']
  });

  errors: { [key: string]: string[] } = {};

  saveChanges(){
    const formValues = this.form.value;
    const ticket = {
      name: formValues.name || '',
      description: formValues.description || '',
      quantity: Number(formValues.quantity) || 0,
      price: Number(formValues.price) || 0,
      event_date: formValues.event_date || '',
      event_location: formValues.event_location || '',
      event_time: formValues.event_time || '',
    };

    this.errors = {};

    this.ticketService.addTicket(ticket).subscribe({
        next: (response: any) => {
          Swal.fire('Ticket registrado', response.message, 'success');
          this.router.navigate(['/listTickets']);
        },
        error: (error) => {
          if (Array.isArray(error)) {
              this.errors = this.groupErrorsByProperty(error);
          } else {
              Swal.fire("Error inesperado");
          }
        }
    });
  }
  private groupErrorsByProperty(errors: any[]): { [key: string]: string[] } {
    const groupedErrors: { [key: string]: string[] } = {};

    errors.forEach((error) => {
      if (!groupedErrors[error.propertyName]) {
        groupedErrors[error.propertyName] = [];
      }
      groupedErrors[error.propertyName].push(error.errorMessage);
    });

    return groupedErrors;
  }
}
