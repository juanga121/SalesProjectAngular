import { Routes } from '@angular/router';
import { LoginUsersComponent } from './Components/login-users/login-users.component';
import { RegisterUsersComponent } from './Components/register-users/register-users.component';
import { authGuard } from './Auth/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginUsersComponent},
    {path: 'register', component: RegisterUsersComponent, canActivate: [authGuard]}
    /*{path: 'listUsers', component: ListUsersComponent}*/
];
