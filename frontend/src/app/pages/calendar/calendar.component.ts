import { Component, OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventInput, EventClickArg } from '@fullcalendar/core'; // Importamos también 'EventClickArg'
import { EventService } from '../../services/event.service';
import { Event } from '../../../shared/interfaces/event.interface';
import { inject } from '@angular/core';
import { UserEventService } from '../../services/userEvent.service';
import { CalendarOptions } from '../../../shared/interfaces/calendar.interface';
import { CalendarService } from '../../services/calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { EditEventData, PopUpComponent } from './pop-up/pop-up.component';

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
  private dialog: MatDialog = inject(MatDialog); 


  eventsFromDB: Event[] = [];
  eventsFromUser: EventInput[] = [];

  //Calendar Options
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [], 
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    droppable: true,
    displayEventTime: false,

  };

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.eventsFromDB = events;
      this.updateCalendarEvents();
    });
  
    this.userEventService.getAllUserEvents().subscribe(events => {
      console.log("Events from user", events);
      this.eventsFromUser = events.map(event => {
        if (event['_id']) event.id = event['_id']; // Asignamos el _id de MongoDB a la propiedad 'id' del evento
        if (!event.title) event.title = event['name'] || 'No Title'; 
        return event;
      });
      this.updateCalendarEvents();
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.calendarService.updateCalendarEvents(this.eventsFromDB, this.eventsFromUser);
  }

  handleDateClick(arg: DateClickArg) {
    const title = prompt('Add the name of the event');
    const description = prompt('Add the description of the event');
  
    if (title && description) {
      const newEvent: EventInput = {title: title, start: arg.dateStr, description: description, allDay: true };

    this.userEventService.createUserEvent(newEvent).subscribe({
      next: (createdEvent) => {
        this.eventsFromUser.push(newEvent);
        this.updateCalendarEvents();
      },
      error: (error) => {
        console.error('Error creating event:', error);
      }
    });
  }
}
  handleEventClick(arg: EventClickArg) {
    alert(`Title: ${arg.event.title}, Description: ${arg.event.extendedProps['description']}`);

     if (confirm(`Would you like to edit ${arg.event.title}?`)) {
      // Preparamos los datos para el diálogo
      const eventData: EditEventData = {
        id: arg.event.id,
        title: arg.event.title,
        description: arg.event.extendedProps['description'],
      };

      // Abrir el diálogo de edición
      const dialogRef = this.dialog.open(PopUpComponent, {
        width: '400px',
        data: eventData
      });

      // Después de cerrar el diálogo, se recibe la data actualizada (si se guardó)
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userEventService.updateUserEvent(result.id, result).subscribe({
            next: (updatedEvent) => {
        
              // Actualizamos el array eventsFromUser con los nuevos datos
              const index = this.eventsFromUser.findIndex(event => event.id === result.id);
              if (index !== -1) {
                this.eventsFromUser[index].title = result.title;
                this.eventsFromUser[index]['description'] = result.description;
              }
              this.updateCalendarEvents();
            },
            error: (err) => console.error('Error updating event:', err)
          });
        }
      });
    } else if (confirm(`Would you like to delete "${arg.event.title}"?`)) {
      const eventId = arg.event.id; 
      this.userEventService.deleteUserEvent(eventId).subscribe({
        next: () => {
          const eventIndex = this.eventsFromUser.findIndex(event => event.id === eventId);
          this.eventsFromUser.splice(eventIndex, 1);  
          this.updateCalendarEvents();  
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }
}



