import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../../Interfaces/users/users';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../authservices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(user: Users): Observable<Users>{
    return this.http.post<Users>(this.apiUrl + '/api/Users/AddUsers', user)
  }

  listUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl + '/api/Users/ListUsers');
  }
}
