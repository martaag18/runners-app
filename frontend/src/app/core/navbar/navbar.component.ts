import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    alert("Successfully Log Out!")
    this.router.navigate(['']);
  }
}


