import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { InfoPoint } from '../../shared/interfaces/infoPoint.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoPointService {

 private http = inject(HttpClient)
 private apiUrl = `${environment.apiUrl}/info-points`;



getInfoPoints(): Observable <InfoPoint[]> {
  return this.http.get<InfoPoint[]>(this.apiUrl);
}
 
}