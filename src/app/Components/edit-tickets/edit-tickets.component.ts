import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TicketsService } from '../../Services/tickets/tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-tickets',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-tickets.component.html',
  styleUrl: './edit-tickets.component.scss'
})
export class EditTicketsComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder)
    ticketService = inject(TicketsService)
    router = inject(Router)
    route = inject(ActivatedRoute)
  
    form = this.formBuilder.group({
      name: [''],
      description: [''],
      quantity: [''],
      price: [''],
      event_date: [''],
      event_location: [''],
      event_time: ['']
    });
  
    errors: { [key: string]: string[] } = {};
    ticketId: string = '';

    ngOnInit(): void {
      this.ticketId = this.route.snapshot.paramMap.get('id') || '';
      
      this.ticketService.getTicketsById(this.ticketId).subscribe({
          next: (response: any) => {
              this.form.patchValue({
                  name: response.name,
                  description: response.description,
                  quantity: response.quantity,
                  price: response.price,
                  event_date: response.event_date,
                  event_location: response.event_location,
                  event_time: response.event_time
              });
          },
          error: (error) => {
              Swal.fire('Error inesperado');
              this.router.navigate(['/listTickets']);
          }
      });
    }
  
    saveChanges(){
      const formValues = this.form.value;
      const ticket = {
        id: this.ticketId,
        name: formValues.name!,
        description: formValues.description!,
        quantity: Number(formValues.quantity),
        price: Number(formValues.price),
        event_date: formValues.event_date!,
        event_location: formValues.event_location!,
        event_time: formValues.event_time!,
      };
  
      this.errors = {};
  
      this.ticketService.editTicket(ticket).subscribe({
          next: (response: any) => {
            Swal.fire('Ticket actualizado', response.message, 'success');
            this.router.navigate(['/listTickets']);
          },
          error: (error) => {
            if (Array.isArray(error)) {
                this.errors = this.groupErrorsByProperty(error);
            } else {
                Swal.fire('Error inesperado');
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
