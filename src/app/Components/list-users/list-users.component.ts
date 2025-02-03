import { Component, inject } from '@angular/core';
import { UsersService } from '../../Services/users/users.service';
import { Users } from '../../Interfaces/users/users';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  serviceUsers = inject(UsersService);
  listUsers?: Users[];

  constructor() {
    this.serviceUsers.listUsers().subscribe(users => {
      this.listUsers = users;
      console.log(users);
    })
  }
}
