import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../../Interfaces/authinterfaces/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token'; //clave para almacenar el token
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Login): Observable<any> {
    return this.http.post(this.apiUrl + '/api/Login', user)
  }

  storesToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); //almaceno el token localmete
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); //obtengo el token
  }

  isLogged(): boolean {
    const token = this.getToken(); // accedo al obtener del token
    return token !== null && !this.jwtHelper.isTokenExpired(token); // verifico si no ha expirado el token
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); //elimino el token localmente
    this.router.navigate(['/login']);
  }

  checkTokenExpiration(): void {
    const token = this.getToken();
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.logout();
    }
  }

  getUserPermissions(): string | null {
    const token = this.getToken();
    if (token){
      const permissionsToken = this.jwtHelper.decodeToken(token);
      return permissionsToken['Permissions'] || null;
    }
    return null;
  }
}
