import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIdentityType, Users } from '../../Interfaces/users/users';
import { UsersService } from '../../Services/users/users.service';
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
    identity_type: [''],
    document_identity: [''],
    name: [''],
    last_name: [''],
    email: [''],
    password: ['']
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
          if(response instanceof Error){
            alert(response.message); 
          }else{
            alert(response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          alert(error.error.message);
        }
      }
    );
  }
}