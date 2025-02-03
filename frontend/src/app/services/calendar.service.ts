import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Event } from '../../shared/interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

    updateCalendarEvents(eventsFromDB: Event[], eventsFromUser: EventInput[]) {
        console.log('Eventos desde la base de datos:', eventsFromDB);
        console.log('Eventos del usuario:', eventsFromUser);
      
        const updatedEvents = [
          ...eventsFromDB.map(event => {
            console.log('Event from DB:', event);
            return {
              title: event.name,
              description: event.description,
              start: new Date(event.date),
              lat: event.latitud,
              lng: event.longitud,
              allDay: true,
              color: "blue",
            };
          }),
          ...eventsFromUser.map((eventUser) => {
            return {
              ...eventUser,
              allDay: true,               
              backgroundColor: 'green',  
              borderColor: 'green',      
              textColor: 'white',        
            };
          })
        ];
      
        console.log('Eventos actualizados:', updatedEvents);
        return updatedEvents;
      }
}
