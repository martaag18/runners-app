import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService)
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };  
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response),
          this.authService.setToken(response.token);
          alert("Successfully logged!")
          this.router.navigate([""])
        },
        error: (error) => console.error('Error en el login:', error),
      });
    }
  }
  
}
