import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIdentityType, Users } from '../interfaces/users';
import { UsersService } from '../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  identityOptions = [
    { value: UserIdentityType.CedulaCiudadania, label: 'Cedula Ciudadania' },
    { value: UserIdentityType.CedulaExtranjeria, label: 'Cedula Extranjeria' },
    { value: UserIdentityType.TrejetaIdentidad, label: 'Tarjeta Identidad' }
  ];

  form = this.formBuilder.group({
    identity_type: ['', [Validators.required]],
    document_identity: ['', [Validators.required]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  saveChanges(){
    const formValues = this.form.value;
    const users = {
      identity_type: Number(formValues.identity_type),
      document_identity: Number(formValues.document_identity),
      name: formValues.name || '',
      last_name: formValues.last_name || '',
      email: formValues.email || '',
      password: formValues.password || ''
    };
    
    this.userService.addUser(users).subscribe({
      next: (response) => {
        console.log(response);
        alert('Usuario creado correctamente');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
      }
    })
  }
} 