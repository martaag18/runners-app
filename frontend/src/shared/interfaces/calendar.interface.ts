import { EventClickArg, EventInput } from '@fullcalendar/core';
import { DateClickArg} from '@fullcalendar/interaction';

export interface CalendarOptions {
    initialView: string;
    plugins: any[];
    events: EventInput[];
    dateClick: (arg: DateClickArg) => void;
    eventClick: (arg: EventClickArg) => void; 
    editable: boolean;
    droppable: boolean;
    displayEventTime: boolean;

  }

export interface EditEventData {
    id: string;
    title: string;
    description: string;
  }