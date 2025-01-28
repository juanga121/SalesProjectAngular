import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl + '/api/Users/AddUsers', user);
  }
  
}
