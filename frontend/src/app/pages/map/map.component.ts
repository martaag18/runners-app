import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EventService } from '../../services/event.service'; // Asegúrate de importar el servicio de eventos
import { Event } from '../../../shared/interfaces/event.interface'; // Asegúrate de que la interfaz esté bien importada
import { GoogleMapsModule } from '@angular/google-maps';
import { inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Marker } from '../../../shared/interfaces/marker.interface';


@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, DatePipe],
  providers: [DatePipe], 
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  private eventService = inject(EventService)
  private datePipe = inject(DatePipe);


  googleMapsApiKey = environment.googleMapsApiKey; 
  center = {lat:0, lng:0};
  zoom = 12;
  markers: Marker[] = []; 
  events: Event[] = [];


  ngOnInit() {
    this.loadEvents(); 
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      console.log('Events received:', events);

      if (events.length > 0) {
        this.center = { lat: events[0].latitud, lng: events[0].longitud };

        // Add markers
        this.markers = events.map(event => ({
          position: { lat: event.latitud, lng: event.longitud },
          title: event.name
        }));


        // Add events to array
        const newEvents = events.map(event => ({
          name: event.name,
          date: event.date,
          description: event.description,
          latitud: event.latitud,
          longitud: event.longitud,
        }));

        this.events.push(...newEvents);
      }

    });
  }
}






