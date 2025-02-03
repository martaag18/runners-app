import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChartComponent } from './pages/chart/chart.component';

export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "map", component: MapComponent},
    { path: "calendar", component: CalendarComponent},
    { path: "charts", component: ChartComponent},
];
