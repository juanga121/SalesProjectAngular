import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../Interfaces/users/users';
import { catchError, Observable, of } from 'rxjs';
import { Error } from '../../Interfaces/erros/error';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(user: Users): Observable<Users | Error>{
    return this.http.post<Users>(this.apiUrl + '/api/Users/AddUsers', user).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'Error al crear el usuario';
        return of({error: true, message: errorMessage});
      })
    );
  }
}
