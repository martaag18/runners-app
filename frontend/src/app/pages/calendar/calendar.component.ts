import { Component, OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventInput, EventClickArg } from '@fullcalendar/core'; // Importamos también 'EventClickArg'
import { EventService } from '../../services/event.service';
import { Event } from '../../../shared/interfaces/event.interface';
import { inject } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  eventsFromDB: Event[] = [];
  eventsFromUser: EventInput[] = [];

  eventService = inject(EventService);


  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      console.log('Eventos desde la base de datos:', events);
      this.eventsFromDB = events;
      this.updateCalendarEvents();
    });
  }

  // Update events en Calendar
  updateCalendarEvents() {

    if(this.eventsFromDB.length>0){

      const mappedEvents = this.eventsFromDB.map((event) => {
        return {
          title: event.name,
        description: event.description,
        start: new Date(event.date),
        lat: event.latitud,
        lng: event.longitud,
        allDay: true
        }
      })
  
    // Update events en Calendar Options
    const allEvents = [...mappedEvents, ...this.eventsFromUser];
    this.calendarOptions.events = allEvents;
    }
  }

  //Calendar Options
  
  calendarOptions: {
    initialView: string;
    plugins: any[];
    events: EventInput[];
    dateClick: (arg: DateClickArg) => void;
    eventClick: (arg: EventClickArg) => void; 
    editable: boolean;
    droppable: boolean;
  } = {
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

      this.eventsFromUser.push(newEvent);
      this.updateCalendarEvents();
    }
  }

  handleEventClick(arg: EventClickArg) {
    alert(`Event: ${arg.event.title} Description: ${arg.event.extendedProps['description']}`);
    if (confirm(`Would you like to delete "${arg.event.title}"?`)) {
      const eventIndex = this.eventsFromUser.findIndex(event => event.title === arg.event.title);
      if (eventIndex !== -1) {
        this.eventsFromUser.splice(eventIndex, 1);
        this.updateCalendarEvents();
      }
    }
  }
}


