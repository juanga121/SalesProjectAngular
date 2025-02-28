import { Routes } from '@angular/router';
import { LoginUsersComponent } from './Components/login-users/login-users.component';
import { RegisterUsersComponent } from './Components/register-users/register-users.component';
import { authGuard } from './Auth/guards/auth.guard';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { ListTicketsComponent } from './Components/list-tickets/list-tickets.component';
import { listGuard } from './Auth/guards/list.guard';
import { AddTicketsComponent } from './Components/add-tickets/add-tickets.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginUsersComponent},
    {path: 'register', component: RegisterUsersComponent},
    {path: 'listUsers', component: ListUsersComponent, canActivate: [authGuard]},
    {path: 'listTickets', component: ListTicketsComponent, canActivate: [listGuard]},
    {path: 'Add-tickets', component: AddTicketsComponent, canActivate: [listGuard]},
];
