import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Event } from '../../shared/interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

 private http = inject(HttpClient)
 private apiUrl = 'http://localhost:3000/events';


 //Método para obtener eventos

 getEvents(): Observable <Event[]> {
  return this.http.get<Event[]>(this.apiUrl);
 }

 
 
}
