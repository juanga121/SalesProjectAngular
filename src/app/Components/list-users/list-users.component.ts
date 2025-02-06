import { Component, Inject, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
export class ListUsersComponent implements OnInit, OnDestroy{
  listUsers?: Users[];
  private mediaQueryListener!: () => void;

  constructor(
    private serviceUsers: UsersService,
    private render: Renderer2, 
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.serviceUsers.listUsers().subscribe(users => {
      this.listUsers = users;
    });

    this.render.setStyle(this.document.body, 'overflow', 'auto');

    this.handleMediaQueryChange();
  }

  handleMediaQueryChange(): void {
    const mediaQuery = window.matchMedia('(min-width: 1000px)');

    const ApplyOverFlow = (matches: boolean) => {
      if (matches) {
        this.render.setStyle(this.document.body, 'overflow', 'hidden');
      } else {
        this.render.setStyle(this.document.body, 'overflow', 'auto');
      }
    }

    ApplyOverFlow(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      ApplyOverFlow(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);

    this.mediaQueryListener = () =>{
      mediaQuery.removeEventListener('change', handleMediaChange);
    }
  }

  ngOnDestroy(): void {
    this.render.removeStyle(this.document.body, 'overflow');
    if (this.mediaQueryListener) {
      this.mediaQueryListener();
    }
  }
}