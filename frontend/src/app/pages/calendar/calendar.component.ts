import { Component, OnInit, inject, signal, computed, effect } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import { EventService } from "../../services/event.service";
import { Event } from "../../../shared/interfaces/event.interface";
import { UserEventService } from "../../services/userEvent.service";
import { CalendarService } from "../../services/calendar.service";
import { DateClickArg } from "@fullcalendar/interaction";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { EditEventData } from "../../../shared/interfaces/calendar.interface";

@Component({
  selector: "app-calendar",
  imports: [FullCalendarModule],
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  private eventService = inject(EventService);
  private userEventService = inject(UserEventService);
  private calendarService = inject(CalendarService);
  private dialog: MatDialog = inject(MatDialog);

  eventsFromDB = signal<Event[]>([]);
  eventsFromUser = signal<EventInput[]>([]);

  combinedEvents = computed(() =>
    this.calendarService.updateCalendarEvents(
      this.eventsFromDB(),
      this.eventsFromUser()
    )
  );

  calendarOptions = this.calendarService.getCalendarOptions(
    this.handleDateClick.bind(this),
    this.handleEventClick.bind(this)
  );

  constructor() {
    effect(() => {
      this.calendarOptions.events = this.combinedEvents();
    });
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.eventsFromDB.set(events);
    });

    this.userEventService.getAllUserEvents().subscribe((events) => {
      this.eventsFromUser.set(this.userEventService.mapUserEvents(events));
    });
  }

  handleDateClick(arg: DateClickArg) {
    const title = prompt("Add the name of the event");
    const description = prompt("Add the description of the event");

    if (title && description) {
      const newEvent: EventInput = {
        title: title,
        start: arg.dateStr,
        description: description,
        allDay: true,
        isFromUser: true, 
      };

      this.userEventService.createUserEvent(newEvent).subscribe({
        next: (createdEvent) => this.addNewEvent(newEvent, createdEvent),
        error: (error) => {
          console.error("Error creating event:", error);
        },
      });
    }
  }

  private addNewEvent(newEvent: EventInput, createdEvent: EventInput): void {
    newEvent.id = createdEvent["_id"];
    this.eventsFromUser.update((current) => [...current, newEvent]);
  }

  handleEventClick(arg: EventClickArg): void {
    alert(`Title: ${arg.event.title}, Description: ${arg.event.extendedProps["description"]}`);

    const isFromUser = arg.event.extendedProps["isFromUser"];
    if (isFromUser) {
      if (confirm(`Would you like to edit ${arg.event.title}?`)) {
        const eventData: EditEventData = {
          id: arg.event.id,
          title: arg.event.title,
          description: arg.event.extendedProps["description"],
        };
        const dialogRef = this.dialog.open(PopUpComponent, {
          width: "500px",
          data: eventData,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.userEventService.updateUserEvent(result.id, result).subscribe({
              next: () => this.updateEventInSignal(result),
              error: (err) => console.error("Error updating event:", err),
            });
          }
        });
      } else if (confirm(`Would you like to delete "${arg.event.title}"?`)) {
        const eventId = arg.event.id;
        this.userEventService.deleteUserEvent(eventId).subscribe({
          next: () => this.removeEventFromSignal(eventId),
          error: (error) => console.error("Error deleting event:", error),
        });
      }
    } else alert("This event can not be modified or deleted");
  }

  private updateEventInSignal(result: EventInput): void {
    this.eventsFromUser.update((current) => current.map((event) => event.id === result.id
          ? {
              ...event,
              title: result.title,
              description: result["description"],
            }
          : event
      )
    );
  }

  private removeEventFromSignal(eventId: string): void {
    this.eventsFromUser.update((current) => current.filter((event) => event.id !== eventId));
  }
}

