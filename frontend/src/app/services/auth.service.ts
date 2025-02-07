import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private API_URL = 'http://localhost:3000/auth/login';
  private http = inject(HttpClient);

  isLoggedSignal = signal(!!localStorage.getItem('token')); //!!->devolver valor boolean


  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.API_URL, data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedSignal.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedSignal.set(false);

  }
}



