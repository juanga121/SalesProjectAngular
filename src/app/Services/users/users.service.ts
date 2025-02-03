import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../../Interfaces/users/users';
import { catchError, Observable, of } from 'rxjs';
import { Error } from '../../Interfaces/erros/error';
import { AuthService } from '../authservices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  addUser(user: Users): Observable<Users | Error>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<Users>(this.apiUrl + '/api/Users/AddUsers', user, {headers}).pipe(
      catchError(err => {
        const errorResponse: Error = {
          error: true,
          message: err.error.message || 'Error desconocido'
        };
        return of(errorResponse);
      })
    );
  }

  listUsers(): Observable<Users[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    console.log('Listando usuarios');
    return this.http.get<Users[]>(this.apiUrl + '/api/Users/ListUsers', {headers});
  }
}
