import { Component, OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventInput, EventClickArg } from '@fullcalendar/core'; // Importamos también 'EventClickArg'
import { EventService } from '../../services/event.service';
import { Event } from '../../../shared/interfaces/event.interface';
import { inject } from '@angular/core';
import { UserEventService } from '../../services/userEvent.service';
import { CalendarOptions } from '../../../shared/interfaces/calendar.interface';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private eventService = inject(EventService);
  private userEventService = inject(UserEventService);
  private calendarService = inject(CalendarService);

  eventsFromDB: Event[] = [];
  eventsFromUser: EventInput[] = [];

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.eventsFromDB = events;
      this.updateCalendarEvents();
    });
  
    this.userEventService.getAllUserEvents().subscribe(events => {
      this.eventsFromUser = events.map(event => {
        if (event['_id']) event.id = event['_id'];  // Asignamos el _id de MongoDB a la propiedad 'id' del evento
        return event;
      });
      this.updateCalendarEvents();
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.calendarService.updateCalendarEvents(this.eventsFromDB, this.eventsFromUser);
  }

  //Calendar Options
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [], 
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    droppable: true,
  };

  handleDateClick(arg: DateClickArg) {
    const title = prompt('Add the name of the event');
    const description = prompt('Add the description of the event');
  
    if (title && description) {
      const newEvent: EventInput = {
        title,
        start: arg.dateStr,
        description,
        allDay: true
      };

    // Guardar el evento en la base de datos usando el observer
    this.userEventService.createUserEvent(newEvent).subscribe({
      next: (createdEvent) => {
        newEvent.id = createdEvent['_id'];
        this.eventsFromUser.push(newEvent);
        this.updateCalendarEvents();
      },
      error: (error) => {
        console.error('Error al crear el evento:', error);
      }
    });
  }
}

  handleEventClick(arg: EventClickArg) {
    if (confirm(`Would you like to delete "${arg.event.title}"?`)) {
      const eventId = arg.event.id; 
      
      this.userEventService.deleteUserEvent(eventId).subscribe({
        next: () => {
          const eventIndex = this.eventsFromUser.findIndex(event => event.id === eventId);
          if (eventIndex !== -1) {
            this.eventsFromUser.splice(eventIndex, 1);  
            this.updateCalendarEvents();  
          }
        },
        error: (error) => {
          console.error('Error al eliminar el evento:', error);
        }
      });
    }
  }
}



