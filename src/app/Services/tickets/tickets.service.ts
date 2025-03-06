import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Tickets } from '../../Interfaces/tickets/tickets';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  addTicket(ticket: FormData): Observable<Tickets>{
    return this.http.post<Tickets>(this.apiUrl + '/api/Tickets/AddTickets', ticket)
  }

  listTickets(): Observable<Tickets[]> {
    console.log('Listando tickets');
    return this.http.get<Tickets[]>(this.apiUrl + '/api/Tickets/ListTickets');
  }

  editTicket(ticketId: string ,ticket: FormData): Observable<Tickets>{
    return this.http.put<Tickets>(this.apiUrl + '/api/Tickets/' + ticketId, ticket)
  }

  getTicketsById(id: string): Observable<Tickets>{
    return this.http.get<Tickets>(this.apiUrl + '/api/Tickets/' + id)
  }

  deleteTicket(id: string): Observable<Tickets>{
    return this.http.delete<Tickets>(this.apiUrl + '/api/Tickets/' + id)
  }
}
