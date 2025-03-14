import { Component, Inject, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { UsersService } from '../../../Services/users/users.service';
import { Users } from '../../../Interfaces/users/users';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{
  listUsers?: Users[];

  constructor(private serviceUsers: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.serviceUsers.listUsers().subscribe(users => {
      this.listUsers = users;
    });
  }
}