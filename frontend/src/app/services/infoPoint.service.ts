import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { InfoPoint } from '../../shared/interfaces/infoPoint.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPointService {

 private http = inject(HttpClient)
 private apiUrl = 'http://localhost:3000/info-points';



getInfoPoints(): Observable <InfoPoint[]> {
  return this.http.get<InfoPoint[]>(this.apiUrl);
}
 
}