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

    selectedFile!: File;
  
    form = this.formBuilder.group({
      name: [''],
      description: [''],
      quantity: [''],
      price: [''],
      event_date: [''],
      event_location: [''],
      event_time: [''],
      imageUrl: ['']
    });
  
    errors: { [key: string]: string[] } = {};
    ticketId: string = '';

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    ngOnInit(): void {
      this.ticketId = this.route.snapshot.paramMap.get('id')!;
      
      this.ticketService.getTicketsById(this.ticketId).subscribe({
          next: (response: any) => {
              this.form.patchValue({
                  name: response.name,
                  description: response.description,
                  quantity: response.quantity,
                  price: response.price,
                  event_date: response.event_date,
                  event_location: response.event_location,
                  event_time: response.event_time,
                  imageUrl: response.imageUrl
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
      const ticket = new FormData();
      ticket.append('Name', formValues.name!);
      ticket.append('Description', formValues.description!);
      ticket.append('Quantity', formValues.quantity!);
      ticket.append('Price', formValues.price!);
      ticket.append('Event_date', formValues.event_date!);
      ticket.append('Event_location', formValues.event_location!);
      ticket.append('Event_time', formValues.event_time!);
      
      if (this.selectedFile) {
        ticket.append('formFile', this.selectedFile);
      }else{
        ticket.append('ImageUrl', formValues.imageUrl!);
      }

      console.log(ticket);

      this.errors = {};
  
      this.ticketService.editTicket(this.ticketId ,ticket).subscribe({
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
