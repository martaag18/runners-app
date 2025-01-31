import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInput } from '@fullcalendar/core';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEventService {

  private apiUrl = 'http://localhost:3000/user-events';
  private http = inject(HttpClient);

  // Obtener eventUser (GET)
  getAllUserEvents(): Observable<EventInput[]> {
    return this.http.get<EventInput[]>(this.apiUrl);
  }

  // Create eventUser (POST)
  createUserEvent(event: EventInput): Observable<any> {
    return this.http.post(this.apiUrl, {
      name: event.title, 
      date: event.start, 
      description: event['description'],
    });
  }

  // Delete eventUser (DELETE)
  deleteUserEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`); 
  }
}
