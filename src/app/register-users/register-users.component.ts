import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-users.component.html',
  styleUrl: './register-users.component.scss'
})
export class RegisterUsersComponent {
  constructor() { }
}
