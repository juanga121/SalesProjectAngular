import { Routes } from '@angular/router';
import { LoginUsersComponent } from './Components/UsersComponents/login-users/login-users.component';
import { RegisterUsersComponent } from './Components/UsersComponents/register-users/register-users.component';
import { authGuard } from './Auth/guards/auth.guard';
import { ListUsersComponent } from './Components/UsersComponents/list-users/list-users.component';
import { ListTicketsComponent } from './Components/TicketsComponents/list-tickets/list-tickets.component';
import { listGuard } from './Auth/guards/list.guard';
import { AddTicketsComponent } from './Components/TicketsComponents/add-tickets/add-tickets.component';
import { EditTicketsComponent } from './Components/TicketsComponents/edit-tickets/edit-tickets.component';
import { PrincipalUserComponent } from './Components/TicketsComponents/principal-user/principal-user.component';
import { PaymentsComponent } from './Components/Payments/purchaseProcess/payments.component';
import { ListpaymentsComponent } from './Components/Payments/listpayments/listpayments.component';
import { ListpaymentsAllComponent } from './Components/Payments/listpayments-all/listpayments-all.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginUsersComponent},
    {path: 'register', component: RegisterUsersComponent},
    {path: 'listUsers', component: ListUsersComponent, canActivate: [authGuard]},
    {path: 'listTickets', component: ListTicketsComponent, canActivate: [listGuard]},
    {path: 'listTickets/ListPayments', component: ListpaymentsAllComponent, canActivate: [listGuard]},
    {path: 'listTickets/Add-tickets', component: AddTicketsComponent, canActivate: [listGuard]},
    {path: 'listTickets/Edit-tickets/:id', component: EditTicketsComponent, canActivate: [listGuard]},
    {path: 'PrincipalTickets', component: PrincipalUserComponent, canActivate: [listGuard]},
    {path: 'PrincipalTickets/PaymentsProcess', component: PaymentsComponent, canActivate: [listGuard]},
    {path: 'PrincipalTickets/ListPayments', component: ListpaymentsComponent, canActivate: [listGuard]}
];
