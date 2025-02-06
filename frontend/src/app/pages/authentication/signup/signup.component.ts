import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Register } from '../../../../shared/interfaces/register.interface';
import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private authService = inject(AuthService)

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
  })

  submitRegister(){
    if (this.registerForm.valid) {
      const user: Register = { //!non-null assertion operator
        name: this.registerForm.value.name!,
        surname: this.registerForm.value.surname!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        repeatPassword: this.registerForm.value.repeatPassword!,
      };

      this.authService.registerUser(user).subscribe({
        next: (response) => {
          console.log("User successfully registered", response.message);
          alert('Registration successful');
        },
        error: (err) => {
          console.error("Error during registration", err)
          alert(err.error.message || 'Registration failed');
        }
      })
    }
  }
}
