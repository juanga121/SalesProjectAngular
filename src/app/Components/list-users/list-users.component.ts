import { Component, inject, OnDestroy, Renderer2 } from '@angular/core';
import { UsersService } from '../../Services/users/users.service';
import { Users } from '../../Interfaces/users/users';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnDestroy{
  serviceUsers = inject(UsersService);
  listUsers?: Users[];

  constructor() {
    this.serviceUsers.listUsers().subscribe(users => {
      this.listUsers = users;
      console.log(users);
    })
  }
  ngOnDestroy(): void {
  }
}
