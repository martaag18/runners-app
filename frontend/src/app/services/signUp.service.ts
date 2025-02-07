import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../shared/interfaces/register.interface';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private API_URL = 'http://localhost:3000/register';
  private http = inject(HttpClient);

  registerUser(data: Register) : Observable< {message: string }>{
    return this.http.post<{ message: string }>(this.API_URL, data);
  }

}
