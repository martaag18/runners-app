import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EventService } from '../../services/event.service'; // Asegúrate de importar el servicio de eventos
import { Event } from '../../../shared/interfaces/event.interface'; // Asegúrate de que la interfaz esté bien importada
import { GoogleMapsModule } from '@angular/google-maps';
import { inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Marker } from '../../../shared/interfaces/marker.interface';
import { InfoPoint } from '../../../shared/interfaces/infoPoint.interface';
import { InfoPointService } from '../../services/infoPoint.service';
import { FormsModule } from '@angular/forms';
import { CheckboxService } from '../../services/checkbox.service';

@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, DatePipe, FormsModule],
  providers: [DatePipe], 
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  private eventService = inject(EventService)
  private datePipe = inject(DatePipe);
  private infoPointService = inject(InfoPointService);
  private checkboxSerive = inject(CheckboxService);
  


  googleMapsApiKey = environment.googleMapsApiKey; 
  center = {lat:0, lng:0};
  zoom = 12;
  markers: Marker[] = []; 
  markersEvents: Marker[] = [];
  markersInfoPoints: Marker[] = [];
  events: Event[] = [];

   // Estado de los checkboxes (por defecto se muestran ambos)
   showEvents: boolean = true;
   showInfoPoints: boolean = true;
   showAll: boolean = false;


  ngOnInit() {
    this.loadEventsMarkers(); 
    this.loadInfoPointsMarkers();
    this.loadEvents();
  }

  private loadEventsMarkers(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      console.log('Events received:', events);

      if (events.length > 0) {
        this.center = { lat: events[0].latitud, lng: events[0].longitud };
        // Add markers
        this.markersEvents = events.map(event => ({
          position: { lat: event.latitud, lng: event.longitud },
          title: event.name
        }));
        this.onCheckBoxChange();
      }
    });
  }

  private loadInfoPointsMarkers(): void {
    this.infoPointService.getInfoPoints().subscribe((infoPoints: InfoPoint[]) => {
      console.log('Info points received', infoPoints);

      if (infoPoints.length > 0){
        this.center = { lat: infoPoints[0].latitud, lng: infoPoints[0].longitud };
        //Add markers
        this.markersInfoPoints = infoPoints.map((infoPoint) => ({
          position: { lat: infoPoint.latitud, lng: infoPoint.longitud },
          title: infoPoint.name
        }));
        this.onCheckBoxChange();
      }
    })
  }

  private loadEvents(){
    this.eventService.getEvents().subscribe((events: Event[]) => {
      const newEvents = events.map(event => ({
        name: event.name,
        date: event.date,
        description: event.description,
        latitud: event.latitud,
        longitud: event.longitud,
      }));
      this.events.push(...newEvents);
    })
  }

  onCheckBoxChange(): void {
    this.markers = this.checkboxSerive.filterMarkers({
      showAll: this.showAll,
      showEvents: this.showEvents,
      showInfoPoints: this.showInfoPoints,
      markersEvents: this.markersEvents,
      markersInfoPoints: this.markersInfoPoints,
    })
  }
}






