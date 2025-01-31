import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Event
    
 } from '../../shared/interfaces/event.interface';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  updateCalendarEvents(eventsFromDB: Event[], eventsFromUser: EventInput[]) {
    return [
      ...eventsFromDB.map(event => ({
        title: event.name,
        description: event.description,
        start: new Date(event.date),
        lat: event.latitud,
        lng: event.longitud,
        allDay: true
      })),
      ...eventsFromUser
    ];
  }
}
