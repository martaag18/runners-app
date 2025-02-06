import { Injectable } from '@angular/core';
import { Marker } from '../../shared/interfaces/marker.interface';


interface FilterCriteria {
  showAll: boolean;
  showEvents: boolean;
  showInfoPoints: boolean;
  markersEvents: Marker[];
  markersInfoPoints: Marker[];
}


@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  filterMarkers(criteria: FilterCriteria): Marker[]{
    if(criteria.showAll){
      return [...criteria.markersEvents, ...criteria.markersInfoPoints]
    } else {
      let result: Marker[] = [];
      if(criteria.showEvents){
        result = [...result, ...criteria.markersEvents];
      }
      if(criteria.showInfoPoints){
        result = [...result, ...criteria.markersInfoPoints];
      }
      return result;
    }
  }
}
