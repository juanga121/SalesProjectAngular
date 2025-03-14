import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tickets',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-tickets.component.html',
  styleUrl: './add-tickets.component.scss'
})
export class AddTicketsComponent {
  private readonly formBuilder = inject(FormBuilder)
  ticketService = inject(TicketsService)
  router = inject(Router)

  selectedFile!: File;

  formaDate() {
    const actualDate = new Date();
    const formattedDate = actualDate.toISOString().split('T')[0];
    return formattedDate;
  }

  form = this.formBuilder.group({
    name: [''],
    description: [''],
    quantity: [''],
    price: [''],
    event_date: [this.formaDate()],
    event_location: [''],
    event_time: ['']
  });

  errors: { [key: string]: string[] } = {};
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveChanges(){
    const formValues = this.form.value;

    const tickets = new FormData();
    tickets.append('Name', formValues.name!);
    tickets.append('Description', formValues.description!);
    tickets.append('Quantity', formValues.quantity!);
    tickets.append('Price', formValues.price!);
    tickets.append('Event_date', formValues.event_date!);
    tickets.append('Event_location', formValues.event_location!);
    tickets.append('Event_time', formValues.event_time!);

    if (this.selectedFile) {
      tickets.append('formFile', this.selectedFile);
    }

    this.errors = {};

    this.ticketService.addTicket(tickets).subscribe({
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
