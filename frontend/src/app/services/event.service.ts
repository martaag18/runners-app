import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Event } from '../../shared/interfaces/event.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

 private http = inject(HttpClient)
 private apiUrl = `${environment.apiUrl}/events`;

 //Método para obtener eventos

 getEvents(): Observable <Event[]> {
  return this.http.get<Event[]>(this.apiUrl);
 }

   // Guardar un nuevo evento en la base de datos
   saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  // Eliminar un evento en la base de datos
  deleteEvent(event: Event): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${event.name}`);
  }
 
}
