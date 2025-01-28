import { Routes } from '@angular/router';
import { LoginUsersComponent } from './login-users/login-users.component';
import { RegisterUsersComponent } from './register-users/register-users.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginUsersComponent},
    {path: 'register', component: RegisterUsersComponent}
];
