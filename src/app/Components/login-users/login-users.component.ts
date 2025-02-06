import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/authservices/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-users',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './login-users.component.html',
  styleUrl: './login-users.component.scss'
})
export class LoginUsersComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  
  ngOnInit(): void {
   this.authService.eliminateToken();
  }
  
  form = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  sendLogin(){
    if(this.form.valid){
      const formValues = this.form.value;
      const users = {
        email: formValues.email || '',
        password: formValues.password || ''
      }
      this.authService.login(users).subscribe({
        next: (response) => {
          this.authService.storesToken(response.token);

          const typeUser = this.authService.getUserPermissions();

          if(typeUser === 'SuperUsuario'){
            this.router.navigate(['/listUsers']);
          }else if(typeUser === 'Administrador'){
            this.router.navigate(['/listTickets']);
          }else if(typeUser === 'Consumidor'){
            this.router.navigate(['/listTickets']);
          }
        },
        error: (error) => {
          Swal.fire('Error', error, 'error');
        }
      })
    }
  }
}
