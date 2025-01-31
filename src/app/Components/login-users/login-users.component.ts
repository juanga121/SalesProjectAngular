import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/authservices/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-users',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login-users.component.html',
  styleUrl: './login-users.component.scss'
})
export class LoginUsersComponent {
  private readonly formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  
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
        next: response => {
          this.authService.storesToken(response.token);
          this.router.navigate(['/register']);
        },
        error: (error) => {
          alert(error);
        }
      })
    }
  }
}
