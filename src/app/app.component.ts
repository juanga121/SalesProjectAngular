import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/authservices/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      const excludedRoutes = ['/login'];
      const currentRoute = this.router.url;

      if(!excludedRoutes.includes(currentRoute)){
        this.authService.checkTokenExpiration();
      }
    }, 5000);
  }
}
