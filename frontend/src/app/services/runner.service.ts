import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Runner } from '../../shared/runner.interface';
import { AgeGroupStats } from '../../shared/runner.interface';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {

  private apiUrl = 'http://localhost:3000/runners';
  private http = inject(HttpClient)

 
//Método para obtener runners
 getRunners(): Observable <Runner[]> {
  return this.http.get<Runner[]>(this.apiUrl);
 }

 calcAgeGroupStats(runners: Runner[]): {
  labels: string[];
  avgBestTimes: number[];
  avgDistances: number[];
} {
  const ageRanges = [
    { label: "18-25", min: 18, max: 25 },
    { label: "26-30", min: 26, max: 30 },
    { label: "31-35", min: 31, max: 35 },
    { label: "36-40", min: 36, max: 40 },
    { label: "41-50", min: 41, max: 50 },
    { label: "50+", min: 51, max: 200 },
  ];

  const groups: Record<string, AgeGroupStats> = {};

  // 1) Inicializar contadores
  ageRanges.forEach(range => {
    groups[range.label] = { 
      totalBestTime: 0, 
      totalDistance: 0, 
      count: 0 };
  });

  // 2) Clasificar cada corredor
  runners.forEach(runner => {
    const group = ageRanges.find(r => runner.age >= r.min && runner.age <= r.max);
    if (group) {
      groups[group.label].totalBestTime += runner.bestTime;
      groups[group.label].totalDistance += runner.totalDistance;
      groups[group.label].count += 1;
    }
  });

  // 3) Calcular promedios
  const labels: string[] = [];
  const avgBestTimes: number[] = [];
  const avgDistances: number[] = [];

  for (const range of ageRanges) {
    const stats = groups[range.label];
    if (stats.count > 0) {
      labels.push(`${range.label} (${stats.count} runners)`);
      avgBestTimes.push(stats.totalBestTime / stats.count);
      avgDistances.push(stats.totalDistance / stats.count);
    }
  }

  return { labels, avgBestTimes, avgDistances };
}
}

