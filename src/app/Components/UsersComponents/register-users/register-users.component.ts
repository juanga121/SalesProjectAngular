import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserIdentityType } from '../../../Interfaces/users/users';
import { UsersService } from '../../../Services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/authservices/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-users',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register-users.component.html',
  styleUrl: './register-users.component.scss'
})

export class RegisterUsersComponent {
  //Formularios reactivos
  private readonly formBuilder = inject(FormBuilder)
  userService = inject(UsersService)
  router = inject(Router)
  authService = inject(AuthService)

  identityOptions = [
    { value: UserIdentityType.CedulaCiudadania, label: 'Cedula Ciudadania' },
    { value: UserIdentityType.CedulaExtranjeria, label: 'Cedula Extranjeria' },
    { value: UserIdentityType.TrejetaIdentidad, label: 'Tarjeta Identidad' }
  ];

  form = this.formBuilder.group({
    identity_type: [''],
    document_identity: [''],
    name: [''],
    last_name: [''],
    email: [''],
    password: ['']
  });

  errors: { [key: string]: string[] } = {};

  saveChanges(){
    const formValues = this.form.value;
    const users = {
      identity_type: Number(formValues.identity_type),
      document_identity: Number(formValues.document_identity),
      name: formValues.name!,
      last_name: formValues.last_name!,
      email: formValues.email!,
      password: formValues.password!
    };

    this.errors = {};
    
    this.userService.addUser(users).subscribe({
        next: (response: any) => {
          Swal.fire('Usuario registrado', response.message, 'success');
          const redirectUsers = this.authService.getToken();
          const redirectUsersPermissions = this.authService.getUserPermissions();
          if (redirectUsers === null || redirectUsersPermissions === 'Administrador' || redirectUsersPermissions === 'Consumidor') {
            this.router.navigate(['/login']);
          }else{
            this.router.navigate(['/listUsers']);
          }
        },
        error: (error) => {
          if (Array.isArray(error)) {
            this.errors = this.groupErrorsByProperty(error);
          } else {
            Swal.fire('Error', error, 'error');
          }
        }
      }
    );
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